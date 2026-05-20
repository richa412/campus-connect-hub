import { useState, useEffect, useRef, useCallback } from "react";
import {
  Mail, Edit3, Plus, Image as ImageIcon, LayoutGrid,
  MoreVertical, Trash2, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type ProfilePost = {
  id: string;
  content: string | null;
  image_url: string | null;
  created_at: string;
};

const AvatarCropModal = ({
  imageSrc,
  onCancel,
  onDone,
}: {
  imageSrc: string;
  onCancel: () => void;
  onDone: (blob: Blob) => Promise<void>;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ mx: 0, my: 0, ox: 0, oy: 0 });
  const [applying, setApplying] = useState(false);

  const SIZE = 320;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d")!;

    ctx.clearRect(0, 0, SIZE, SIZE);

    const scale = zoom;
    const iw = img.naturalWidth * scale;
    const ih = img.naturalHeight * scale;
    const baseX = (SIZE - iw) / 2;
    const baseY = (SIZE - ih) / 2;
    ctx.drawImage(img, baseX + offset.x, baseY + offset.y, iw, ih);

    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,0.55)";
    ctx.fillRect(0, 0, SIZE, SIZE);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2 - 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2 - 4, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(img, baseX + offset.x, baseY + offset.y, iw, ih);
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = "rgba(255,255,255,0.85)";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2 - 4, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }, [zoom, offset]);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      const fit = Math.min(SIZE / img.naturalWidth, SIZE / img.naturalHeight);
      setZoom(fit);
      setOffset({ x: 0, y: 0 });
    };
    img.src = imageSrc;
  }, [imageSrc]);

  useEffect(() => { draw(); }, [draw]);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    if ("touches" in e) {
      const t = e.touches[0];
      const rect = canvasRef.current!.getBoundingClientRect();
      return { x: t.clientX - rect.left, y: t.clientY - rect.top };
    }
    return { x: (e as React.MouseEvent).nativeEvent.offsetX, y: (e as React.MouseEvent).nativeEvent.offsetY };
  };

  const onPointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    const pos = getPos(e);
    dragStart.current = { mx: pos.x, my: pos.y, ox: offset.x, oy: offset.y };
    setDragging(true);
  };

  const onPointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging) return;
    const pos = getPos(e);
    const dx = pos.x - dragStart.current.mx;
    const dy = pos.y - dragStart.current.my;
    setOffset({ x: dragStart.current.ox + dx, y: dragStart.current.oy + dy });
  };

  const onPointerUp = () => setDragging(false);

  const handleApply = async () => {
    const img = imgRef.current;
    if (!img) return;
    setApplying(true);

    const out = document.createElement("canvas");
    const R = 256;
    out.width = R;
    out.height = R;
    const ctx = out.getContext("2d")!;

    const ratio = R / SIZE;
    const scale = zoom;
    const iw = img.naturalWidth * scale * ratio;
    const ih = img.naturalHeight * scale * ratio;
    const baseX = (R - iw) / 2;
    const baseY = (R - ih) / 2;

    ctx.save();
    ctx.beginPath();
    ctx.arc(R / 2, R / 2, R / 2, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(img, baseX + offset.x * ratio, baseY + offset.y * ratio, iw, ih);
    ctx.restore();

    out.toBlob(async (blob) => {
      if (!blob) { setApplying(false); return; }
      await onDone(blob);
      setApplying(false);
    }, "image/jpeg", 0.93);
  };

  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm">
      <div className="w-full max-w-sm flex items-center justify-between px-4 py-3 mb-4">
        <button
          onClick={onCancel}
          className="text-gray-300 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        <span className="text-white font-semibold text-sm tracking-wide">Move and Scale</span>
        <button
          onClick={handleApply}
          disabled={applying}
          className="text-indigo-400 hover:text-indigo-300 font-bold text-sm px-3 py-1.5 rounded-lg hover:bg-indigo-500/20 transition-colors disabled:opacity-50"
        >
          {applying ? "Saving..." : "Apply"}
        </button>
      </div>

      <canvas
        ref={canvasRef}
        width={SIZE}
        height={SIZE}
        className="rounded-full cursor-grab active:cursor-grabbing touch-none"
        style={{ width: SIZE, height: SIZE }}
        onMouseDown={onPointerDown}
        onMouseMove={onPointerMove}
        onMouseUp={onPointerUp}
        onMouseLeave={onPointerUp}
        onTouchStart={onPointerDown}
        onTouchMove={onPointerMove}
        onTouchEnd={onPointerUp}
      />

      <div className="w-full max-w-sm flex items-center gap-3 px-6 mt-6">
        <span className="text-gray-400 text-xs">-</span>
        <input
          type="range"
          min={0.2}
          max={4}
          step={0.01}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="flex-1 accent-indigo-500 cursor-pointer"
        />
        <span className="text-gray-400 text-xs">+</span>
      </div>
      <p className="text-gray-500 text-xs mt-2">Drag to reposition - Slider to zoom</p>
    </div>
  );
};

const PostCard = ({
  post,
  onDelete,
}: {
  post: ProfilePost;
  onDelete: (id: string) => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const needsExpand = (post.content?.length ?? 0) > 120;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <article className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <span className="text-xs text-gray-500">
          {new Date(post.created_at).toLocaleDateString("en-IN", {
            day: "numeric", month: "short", year: "numeric",
          })}
        </span>
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-8 w-40 bg-[#0f1827] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
              <button
                onClick={() => { setMenuOpen(false); onDelete(post.id); }}
                className="flex items-center gap-2 w-full px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <Trash2 className="h-4 w-4" /> Delete Post
              </button>
            </div>
          )}
        </div>
      </div>

      {post.image_url && (
        <img
          src={post.image_url}
          alt="post"
          className="w-full object-contain bg-black/20"
          style={{ maxHeight: "600px" }}
        />
      )}

      {post.content && (
        <div className="px-5 py-4">
          <p className={cn(
            "text-gray-200 text-sm leading-relaxed whitespace-pre-wrap",
            !expanded && "line-clamp-3"
          )}>
            {post.content}
          </p>
          {needsExpand && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-indigo-400 text-sm mt-1.5 hover:underline"
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>
      )}
      {!post.content && <div className="h-4" />}
    </article>
  );
};

const CreatePostDialog = ({
  open,
  onOpenChange,
  onPosted,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onPosted: () => void;
}) => {
  const [postText, setPostText] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      setPostText("");
      setImageFile(null);
      setImagePreview(null);
    }
  }, [open]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    e.target.value = "";
  };

  const handleSubmit = async () => {
    if (!postText.trim() && !imageFile) return;
    setLoading(true);
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;
    if (!user) { setLoading(false); return; }

    let imageUrl: string | null = null;
    if (imageFile) {
      const filePath = `${user.id}/${Date.now()}-${imageFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from("post-images").upload(filePath, imageFile);
      if (uploadError) { alert("Image upload failed"); setLoading(false); return; }
      const { data } = supabase.storage.from("post-images").getPublicUrl(filePath);
      imageUrl = data.publicUrl;
    }

    const { error } = await supabase.from("posts").insert({
      user_id: user.id,
      content: postText.trim() || null,
      image_url: imageUrl,
    });

    setLoading(false);
    if (error) alert("Post failed");
    else { onOpenChange(false); onPosted(); }
  };

  const canPost = postText.trim().length > 0 || imageFile !== null;

  return (
    <DialogContent className="bg-[#0b1120] border-white/10 text-white sm:max-w-[525px]">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">Create a Post</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-4 py-2">
        <div className="flex flex-col gap-2">
          <Label className="text-xs font-bold uppercase tracking-widest text-gray-400">
            What's on your mind?
          </Label>
          <Textarea
            placeholder="Write something..."
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            className="bg-white/5 border-white/10 text-white rounded-xl min-h-[130px] p-4 text-base resize-none"
          />
        </div>
        {imagePreview && (
          <div className="relative rounded-xl overflow-hidden border border-white/10">
            <img src={imagePreview} alt="preview"
              className="w-full object-contain bg-black/20"
              style={{ maxHeight: "280px" }} />
            <button
              onClick={() => { setImageFile(null); setImagePreview(null); }}
              className="absolute top-2 right-2 bg-black/70 hover:bg-red-500/80 text-white rounded-lg p-1 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        <label className="flex items-center justify-center gap-2 h-11 rounded-xl border border-white/10 hover:bg-white/10 cursor-pointer transition-colors text-sm font-bold text-white">
          <ImageIcon className="h-4 w-4 text-indigo-400" />
          {imageFile ? "Change Photo" : "Add Photo"}
          <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
        </label>
      </div>
      <DialogFooter className="mt-2">
        <Button
          onClick={handleSubmit}
          disabled={!canPost || loading}
          className="bg-indigo-500 hover:bg-indigo-600 rounded-xl w-full h-12 font-bold text-base disabled:opacity-40"
        >
          {loading ? "Posting..." : "Post to Feed"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const [cropSrc, setCropSrc] = useState<string | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [posts, setPosts] = useState<ProfilePost[]>([]);

  useEffect(() => {
    const loadProfile = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) return;
      setEmail(user.email || "");
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
      if (data) {
        setName(data.full_name || "");
        setCourse(data.course || "");
        setYear(data.year || "");
        setAvatarUrl(data.avatar_url || "");
      } else {
        setName(user.user_metadata?.full_name || user.email || "User");
      }
    };
    loadProfile();
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;
    if (!user) return;
    const { data, error } = await supabase
      .from("posts").select("*").eq("user_id", user.id)
      .order("created_at", { ascending: false });
    if (!error && data) setPosts(data);
  };

  const handleDeletePost = async (postId: string) => {
    const { error } = await supabase.from("posts").delete().eq("id", postId);
    if (error) alert("Failed to delete post");
    else setPosts((prev) => prev.filter((p) => p.id !== postId));
  };

  const handleAvatarFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setShowPhotoOptions(false);
    const reader = new FileReader();
    reader.onload = () => {
      setCropSrc(reader.result as string);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleCropDone = async (blob: Blob) => {
    setCropSrc(null);
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;
    if (!user) return;
    const filePath = `${user.id}/${Date.now()}-avatar.jpg`;
    const { error } = await supabase.storage.from("avatars").upload(filePath, blob, {
      contentType: "image/jpeg",
    });
    if (error) { alert("Avatar upload failed"); return; }
    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
    setAvatarUrl(data.publicUrl);
    await supabase.from("profiles").upsert({ id: user.id, avatar_url: data.publicUrl });
  };

  const initials = name ? name.split(" ").map((n) => n[0]).join("").toUpperCase() : "?";

  return (
    <>
      {cropSrc && (
        <AvatarCropModal
          imageSrc={cropSrc}
          onCancel={() => setCropSrc(null)}
          onDone={handleCropDone}
        />
      )}

      <div className="max-w-4xl mx-auto space-y-10 pb-20">
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 shadow-2xl overflow-hidden">

          <div className="h-28 relative overflow-hidden"
            style={{
              background: "linear-gradient(120deg, #3730a3 0%, #6d28d9 50%, #1e1b4b 100%)",
            }}
          >
            <div className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: "repeating-linear-gradient(90deg,transparent,transparent 48px,rgba(255,255,255,0.18) 48px,rgba(255,255,255,0.18) 49px)",
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_110%,rgba(139,92,246,0.4),transparent_60%)]" />
          </div>

          <div className="px-8 pb-8 relative">
            <div className="flex items-end gap-4 -mt-12 mb-5">
              <div className="relative shrink-0">
                <div
                  className="h-24 w-24 rounded-full bg-indigo-600 flex items-center justify-center text-2xl font-bold text-white overflow-hidden"
                  style={{ border: "4px solid #0b1120", boxShadow: "0 4px 24px rgba(0,0,0,0.5)" }}
                >
                  {avatarUrl
                    ? <img src={avatarUrl} className="w-full h-full object-cover" alt="avatar" />
                    : initials}
                </div>

                <button
                  onClick={() => setShowPhotoOptions((v) => !v)}
                  className="absolute bottom-0 right-0 bg-[#0b1120] border border-white/20 p-1.5 rounded-full hover:bg-white/10 transition-colors shadow-md"
                >
                  <Edit3 className="h-3 w-3 text-white" />
                </button>

                {showPhotoOptions && (
                  <div className="absolute top-28 left-0 bg-[#0b1120] border border-white/10 rounded-xl p-1.5 shadow-2xl w-52 z-50">
                    <label className="flex items-center gap-2.5 px-3 py-2.5 hover:bg-white/10 rounded-lg cursor-pointer text-sm text-white transition-colors">
                      <ImageIcon className="h-4 w-4 text-indigo-400 shrink-0" />
                      Change Profile Photo
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarFileSelect}
                      />
                    </label>
                    <button
                      onClick={async () => {
                        const { data: ud } = await supabase.auth.getUser();
                        const u = ud.user;
                        if (!u) return;
                        await supabase.from("profiles").upsert({ id: u.id, avatar_url: "" });
                        setAvatarUrl("");
                        setShowPhotoOptions(false);
                      }}
                      className="flex items-center gap-2.5 w-full text-left px-3 py-2.5 hover:bg-red-500/10 rounded-lg text-red-400 text-sm transition-colors"
                    >
                      <Trash2 className="h-4 w-4 shrink-0" />
                      Remove Photo
                    </button>
                  </div>
                )}
              </div>

              <div className="flex-1" />

              <div className="mb-1">
                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm"
                      className="rounded-xl border-white/20 hover:bg-white/10 text-white text-sm font-semibold px-4">
                      <Edit3 className="h-3.5 w-3.5 mr-1.5" /> Edit Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-[#0b1120] border-white/10 text-white sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">Edit Profile</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                      <div className="grid gap-2">
                        <Label className="text-sm font-bold uppercase tracking-widest text-gray-400">Full Name</Label>
                        <Input value={name} onChange={(e) => setName(e.target.value)}
                          className="bg-white/5 border-white/10 text-white rounded-xl h-12" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label className="text-sm font-bold uppercase tracking-widest text-gray-400">Course</Label>
                          <Input value={course} onChange={(e) => setCourse(e.target.value)}
                            className="bg-white/5 border-white/10 text-white rounded-xl h-12" />
                        </div>
                        <div className="grid gap-2">
                          <Label className="text-sm font-bold uppercase tracking-widest text-gray-400">Year</Label>
                          <Input value={year} onChange={(e) => setYear(e.target.value)}
                            className="bg-white/5 border-white/10 text-white rounded-xl h-12" />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={async () => {
                        const { data: ud } = await supabase.auth.getUser();
                        const u = ud.user;
                        if (!u) return;
                        const { error } = await supabase.from("profiles").upsert({
                          id: u.id, full_name: name, course, year,
                        });
                        if (!error) { setIsEditOpen(false); alert("Profile saved!"); }
                        else alert("Error saving profile");
                      }} className="bg-indigo-500 hover:bg-indigo-600 rounded-xl w-full h-12 font-bold">
                        Save Changes
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white tracking-tight leading-tight">{name}</h1>
              {(course || year) && (
                <p className="text-sm text-gray-400 mt-0.5">
                  {course}{course && year ? " - " : ""}{year}
                </p>
              )}
              <div className="flex items-center gap-1.5 mt-2">
                <Mail className="h-3.5 w-3.5 text-indigo-400" />
                <span className="text-sm text-gray-400">{email}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                  <LayoutGrid className="h-4 w-4 text-indigo-400" />
                </div>
                <h2 className="text-base font-bold text-white tracking-tight uppercase">Posts</h2>
                {posts.length > 0 && (
                  <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                    {posts.length}
                  </span>
                )}
              </div>

              <div
                className="overflow-y-auto pr-1 space-y-4"
                style={{ maxHeight: "600px", scrollbarWidth: "thin", scrollbarColor: "rgba(99,102,241,0.4) transparent" }}
              >
                {posts.length === 0 && (
                  <p className="text-gray-500 text-sm py-4">No posts yet. Create your first post!</p>
                )}
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} onDelete={handleDeletePost} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-10 right-10 z-50 flex flex-col items-end gap-4">
          <Dialog open={isPostOpen} onOpenChange={setIsPostOpen}>
            {isFabOpen && (
              <div className="flex flex-col gap-3 mb-2">
                <DialogTrigger asChild>
                  <Button onClick={() => setIsFabOpen(false)}
                    className="bg-[#0b1120] backdrop-blur-md border border-white/10 text-white rounded-xl px-8 py-7 shadow-2xl hover:bg-white/10 flex items-center gap-3 font-bold text-lg">
                    <ImageIcon className="h-6 w-6 text-indigo-400" /> Post
                  </Button>
                </DialogTrigger>
              </div>
            )}

            <Button
              onClick={() => setIsFabOpen(!isFabOpen)}
              className={cn(
                "h-16 w-16 rounded-2xl bg-indigo-500 text-white shadow-2xl shadow-indigo-500/40 flex items-center justify-center transition-all duration-300",
                isFabOpen ? "rotate-45 bg-rose-500 shadow-rose-500/40" : "hover:scale-110"
              )}
            >
              <Plus className="h-10 w-10" />
            </Button>

            <CreatePostDialog open={isPostOpen} onOpenChange={setIsPostOpen} onPosted={fetchPosts} />
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
