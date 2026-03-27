import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_TOKEN = import.meta.env.VITE_COURSE_API_TOKEN;

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ── Skeleton ─────────────────────────────────────────────────────────────────

function BlogPostSkeleton() {
  return (
    <div className="w-full bg-white min-h-screen py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 animate-pulse">
        {/* Back button */}
        <div className="h-4 bg-slate-200 rounded w-32 mb-8" />

        {/* Badge */}
        <div className="h-6 w-24 bg-slate-200 rounded-full mb-6" />

        {/* Title */}
        <div className="h-10 bg-slate-200 rounded w-3/4 mb-3" />
        <div className="h-10 bg-slate-200 rounded w-1/2 mb-6" />

        {/* Intro */}
        <div className="h-5 bg-slate-200 rounded w-full mb-2" />
        <div className="h-5 bg-slate-200 rounded w-4/5 mb-8" />

        {/* Meta */}
        <div className="flex items-center gap-6 pb-6 border-b border-slate-200 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200" />
            <div className="space-y-1">
              <div className="h-4 w-28 bg-slate-200 rounded" />
              <div className="h-3 w-12 bg-slate-200 rounded" />
            </div>
          </div>
          <div className="h-4 w-28 bg-slate-200 rounded" />
          <div className="h-4 w-20 bg-slate-200 rounded" />
        </div>

        {/* Hero image */}
        <div className="w-full aspect-video bg-slate-200 rounded-xl mb-10" />

        {/* Content lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={`h-4 bg-slate-200 rounded mb-3 ${i % 3 === 2 ? "w-3/4" : "w-full"}`} />
        ))}
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/api/resource/Blog Post/${slug}`, {
          headers: { Authorization: `token ${API_TOKEN}` },
        });
        if (!res.ok) { setNotFound(true); return; }
        const data = await res.json();
        const postData = data.data;
        setPost(postData);

        if (postData.blog_category) {
          try {
            const catRes = await fetch(
              `${BASE_URL}/api/resource/Blog Category/${postData.blog_category}`,
              { headers: { Authorization: `token ${API_TOKEN}` } }
            );
            if (catRes.ok) {
              const catData = await catRes.json();
              setCategoryTitle(catData.data?.title || postData.blog_category);
            } else {
              setCategoryTitle(postData.blog_category);
            }
          } catch {
            setCategoryTitle(postData.blog_category);
          }
        }
      } catch (err) {
        console.error("Error fetching blog post:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return <BlogPostSkeleton />;

  if (notFound || !post) {
    return (
      <div className="w-full bg-white min-h-screen flex items-center justify-center py-20">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">Post not found</h2>
          <p className="text-slate-500 text-sm">This article may have been moved or removed.</p>
          <Link to="/blog">
            <Button className="bg-slate-900 hover:bg-slate-800 text-white mt-2">
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isMarkdown = post.content_type === "Markdown" && post.content_md;
  const htmlContent = isMarkdown
    ? null
    : (post.content || "").replace(/src="\/files\//g, `src="${BASE_URL}/files/`);
  const markdownContent = isMarkdown ? post.content_md : null;

  const metaImageUrl = post.meta_image
    ? post.meta_image.startsWith("http")
      ? post.meta_image
      : `${BASE_URL}${post.meta_image}`
    : null;

  return (
    <div className="w-full bg-white min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-sm text-slate-500
                     hover:text-slate-900 font-medium mb-8 group transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to all posts
        </button>

        {/* ── Header ── */}
        <header className="mb-10">

          {/* Category badge */}
          {categoryTitle && (
            <div className="mb-4">
              <Badge className="bg-slate-900 hover:bg-slate-800 text-white text-sm capitalize px-3 py-1">
                {categoryTitle}
              </Badge>
            </div>
          )}

          {/* Title */}
          <h1 className="mb-4 text-center text-2xl font-extrabold leading-tight text-slate-900 sm:text-3xl md:text-4xl tracking-tight">
            {post.title}
          </h1>

          {/* Intro */}
          {post.blog_intro && (
            <p className="mb-6 text-center text-sm sm:text-base leading-relaxed text-slate-500">
              {post.blog_intro}
            </p>
          )}

          {/* Meta row */}
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-6
                          sm:flex-row sm:items-center sm:justify-center text-sm text-slate-500">

            {/* Author */}
            {post.blogger && (
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full
                                bg-gradient-to-br from-slate-700 to-slate-500
                                font-semibold text-white text-sm flex-shrink-0">
                  {post.blogger.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-medium text-slate-900">By {post.blogger}</div>
                  <div className="text-slate-400 text-xs">Author</div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {post.published_on && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.published_on)}
                </span>
              )}
              {post.read_time && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.read_time} min read
                </span>
              )}
            </div>
          </div>
        </header>

        {/* Hero image */}
        {metaImageUrl && (
          <div className="mb-10">
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-slate-100">
              <img
                src={metaImageUrl}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Article content */}
        <article className="blog-post-content">
          {isMarkdown ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {markdownContent}
            </ReactMarkdown>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
          )}
        </article>

        {/* Footer */}
        <footer className="mt-12 border-t border-slate-200 pt-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {categoryTitle && (
              <Badge className="bg-slate-900 hover:bg-slate-800 text-white text-sm capitalize px-3 py-1">
                {categoryTitle}
              </Badge>
            )}
            {post.published_on && (
              <span className="text-sm text-slate-500">
                Published {formatDate(post.published_on)}
              </span>
            )}
          </div>
        </footer>

        {/* Back to blog CTA */}
        <div className="mt-10 text-center">
          <Link to="/blog">
            <Button
              variant="outline"
              className="border-2 border-slate-900 text-slate-900 hover:bg-slate-900
                         hover:text-white font-semibold px-6 transition-all"
            >
              ← All Posts
            </Button>
          </Link>
        </div>
      </div>

      <style>{`
        .blog-post-content {
          color: #374151;
          font-size: 1rem;
          line-height: 1.8;
        }
        .blog-post-content h1,
        .blog-post-content h2,
        .blog-post-content h3,
        .blog-post-content h4 {
          color: #0f172a;
          font-weight: 700;
          margin-top: 1.75em;
          margin-bottom: 0.5em;
          line-height: 1.3;
        }
        .blog-post-content h1 { font-size: 1.75rem; }
        .blog-post-content h2 { font-size: 1.4rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.3em; }
        .blog-post-content h3 { font-size: 1.2rem; }
        .blog-post-content h4 { font-size: 1.05rem; }
        .blog-post-content p { margin-bottom: 1.25em; }
        .blog-post-content a { color: #1e293b; text-decoration: underline; font-weight: 500; }
        .blog-post-content a:hover { color: #0f172a; }
        .blog-post-content ul,
        .blog-post-content ol { padding-left: 1.5em; margin-bottom: 1.25em; }
        .blog-post-content ul { list-style-type: disc; }
        .blog-post-content ol { list-style-type: decimal; }
        .blog-post-content li { margin-bottom: 0.4em; }
        .blog-post-content blockquote {
          border-left: 4px solid #cbd5e1;
          padding: 0.75rem 1rem;
          color: #64748b;
          font-style: italic;
          margin: 1.5em 0;
          background: #f8fafc;
          border-radius: 0 0.5rem 0.5rem 0;
        }
        .blog-post-content pre {
          background: #1e293b;
          color: #e2e8f0;
          border-radius: 0.75rem;
          padding: 1.25rem;
          overflow-x: auto;
          font-size: 0.875rem;
          margin: 1.5em 0;
          line-height: 1.6;
        }
        .blog-post-content code {
          background: #f1f5f9;
          padding: 0.15em 0.4em;
          border-radius: 0.25rem;
          font-size: 0.875em;
          color: #0f172a;
          border: 1px solid #e2e8f0;
        }
        .blog-post-content pre code {
          background: transparent;
          padding: 0;
          border: none;
          color: inherit;
        }
        .blog-post-content img { max-width: 100%; border-radius: 0.75rem; margin: 1.5em 0; }
        .blog-post-content table { width: 100%; border-collapse: collapse; margin: 1.5em 0; font-size: 0.9rem; }
        .blog-post-content th,
        .blog-post-content td { border: 1px solid #e2e8f0; padding: 0.6rem 0.9rem; text-align: left; }
        .blog-post-content th { background: #f8fafc; font-weight: 600; color: #0f172a; }
        .blog-post-content tr:nth-child(even) td { background: #f8fafc; }
        .blog-post-content hr { border: none; border-top: 1px solid #e2e8f0; margin: 2em 0; }
        .blog-post-content strong { color: #0f172a; font-weight: 700; }
      `}</style>
    </div>
  );
}