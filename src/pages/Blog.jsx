import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, User, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_TOKEN = import.meta.env.VITE_COURSE_API_TOKEN;

const POSTS_PER_PAGE = 10;

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function stripHtml(html) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").substring(0, 160);
}

// ── Skeletons ────────────────────────────────────────────────────────────────

function BlogCardSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row animate-pulse gap-4 sm:gap-6 border-b border-gray-100 px-4 py-6 sm:py-8">
      <div className="aspect-video w-full sm:w-48 flex-shrink-0 rounded bg-slate-200" />
      <div className="flex-1 space-y-3 mt-1">
        <div className="h-6 w-3/4 rounded bg-slate-200" />
        <div className="h-4 w-full rounded bg-slate-200" />
        <div className="h-4 w-5/6 rounded bg-slate-200" />
        <div className="flex items-center gap-3 mt-4">
          <div className="h-3 w-24 rounded bg-slate-200" />
          <div className="h-3 w-20 rounded bg-slate-200" />
          <div className="h-3 w-16 rounded bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

// ── Blog Card ────────────────────────────────────────────────────────────────

function BlogCard({ post, categoryMap }) {
  const excerpt = post.blog_intro || stripHtml(post.content);
  const categoryTitle = categoryMap[post.blog_category] || post.blog_category;
  const imageUrl = post.meta_image
    ? post.meta_image.startsWith("http")
      ? post.meta_image
      : `${BASE_URL}${post.meta_image}`
    : null;

  return (
    <Link to={`/blog/${post.name}`} className="group block">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 border-b border-gray-100 px-4 py-6 sm:py-8 rounded-md transition-all duration-300 hover:shadow-md hover:bg-slate-50">
        {imageUrl && (
          <div className="aspect-video w-full sm:w-48 flex-shrink-0 overflow-hidden rounded bg-slate-100">
            <img
              src={imageUrl}
              alt={post.title}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => (e.currentTarget.parentElement.style.display = "none")}
            />
          </div>
        )}

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="mb-2 text-lg sm:text-xl font-semibold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
              {post.title}
            </h3>
            {excerpt && (
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed line-clamp-2 mb-3">
                {excerpt}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-500">
            {post.blogger && (
              <span className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {post.blogger}
              </span>
            )}
            {categoryTitle && (
              <span className="text-slate-400">in {categoryTitle}</span>
            )}
            {post.published_on && (
              <span className="flex items-center gap-1 sm:ml-auto">
                <Calendar className="w-3 h-3" />
                {formatDate(post.published_on)}
              </span>
            )}
            {post.read_time && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.read_time} min read
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── Pagination ───────────────────────────────────────────────────────────────

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
    .reduce((acc, p, i, arr) => {
      if (i > 0 && p - arr[i - 1] > 1) acc.push("...");
      acc.push(p);
      return acc;
    }, []);

  return (
    <div className="flex items-center justify-center gap-2 mt-10 md:mt-14">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange((p) => p - 1)}
        className="px-4 py-2 rounded-lg border-2 border-slate-200 text-sm font-medium
                   text-slate-700 hover:border-slate-900 disabled:opacity-40
                   disabled:cursor-not-allowed transition-all bg-white"
      >
        Previous
      </button>

      {pages.map((item, i) =>
        item === "..." ? (
          <span key={`e-${i}`} className="px-2 text-slate-400 text-sm">…</span>
        ) : (
          <button
            key={item}
            onClick={() => onPageChange(item)}
            className={`w-9 h-9 rounded-lg border-2 text-sm font-semibold transition-all ${
              currentPage === item
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-700 border-slate-200 hover:border-slate-900"
            }`}
          >
            {item}
          </button>
        )
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange((p) => p + 1)}
        className="px-4 py-2 rounded-lg border-2 border-slate-200 text-sm font-medium
                   text-slate-700 hover:border-slate-900 disabled:opacity-40
                   disabled:cursor-not-allowed transition-all bg-white"
      >
        Next
      </button>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const [categoryMap, setCategoryMap] = useState({});
  const [categories, setCategories] = useState(["All Categories"]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  const debouncedSearch = useDebounce(searchTerm, 400);
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const limitStart = (currentPage - 1) * POSTS_PER_PAGE;

  // ── Fetch categories once ────────────────────────────────────────────────
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fields = encodeURIComponent(JSON.stringify(["name", "title"]));
        const res = await fetch(
          `${BASE_URL}/api/resource/Blog Category?fields=${fields}&limit=100`,
          { headers: { Authorization: `token ${API_TOKEN}` } }
        );
        const data = await res.json();
        const list = data.data || [];

        const map = {};
        list.forEach((cat) => { map[cat.name] = cat.title || cat.name; });
        setCategoryMap(map);

        const postFields = encodeURIComponent(JSON.stringify(["blog_category"]));
        const postFilters = encodeURIComponent(JSON.stringify([["published", "=", 1]]));
        const postRes = await fetch(
          `${BASE_URL}/api/resource/Blog Post?fields=${postFields}&limit=500&filters=${postFilters}`,
          { headers: { Authorization: `token ${API_TOKEN}` } }
        );
        const postData = await postRes.json();
        const usedIds = [...new Set((postData.data || []).map((p) => p.blog_category).filter(Boolean))];
        const titles = usedIds.map((id) => map[id] || id);
        setCategories(["All Categories", ...titles]);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => { setCurrentPage(1); }, [selectedCategory, debouncedSearch]);

  // ── Fetch posts ──────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const filters = [["published", "=", 1]];
        const orFilters = [];

        if (selectedCategory !== "All Categories") {
          const catId = Object.keys(categoryMap).find(
            (id) => (categoryMap[id] || id) === selectedCategory
          );
          if (catId) filters.push(["blog_category", "=", catId]);
        }

        if (debouncedSearch) {
          orFilters.push(
            ["title", "like", `%${debouncedSearch}%`],
            ["blogger", "like", `%${debouncedSearch}%`]
          );
        }

        const fields = encodeURIComponent(
          JSON.stringify([
            "name", "title", "blogger", "blog_category",
            "published_on", "read_time", "blog_intro", "content", "meta_image",
          ])
        );
        const filterQ = encodeURIComponent(JSON.stringify(filters));
        const orFilterQ = orFilters.length
          ? `&or_filters=${encodeURIComponent(JSON.stringify(orFilters))}`
          : "";
        const orderQ = `&order_by=${encodeURIComponent("published_on desc")}`;

        const [postsRes, countRes] = await Promise.all([
          fetch(
            `${BASE_URL}/api/resource/Blog Post?fields=${fields}&limit=${POSTS_PER_PAGE}&limit_start=${limitStart}&filters=${filterQ}${orFilterQ}${orderQ}`,
            { headers: { Authorization: `token ${API_TOKEN}` } }
          ),
          fetch(
            `${BASE_URL}/api/method/frappe.client.get_count?doctype=Blog%20Post&filters=${filterQ}${orFilterQ}`,
            { headers: { Authorization: `token ${API_TOKEN}` } }
          ),
        ]);

        const postsData = await postsRes.json();
        const countData = await countRes.json();
        setPosts(postsData.data || []);
        setTotalPosts(countData.message || 0);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    if (selectedCategory === "All Categories" || Object.keys(categoryMap).length > 0) {
      fetchPosts();
    }
  }, [selectedCategory, debouncedSearch, currentPage, limitStart, categoryMap]);

  return (
    <div className="w-full bg-white min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-14">

        {/* Header */}
        <header className="mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Blog & Insights
            </h1>
            <p className="text-slate-500 text-base mt-2">
              Thoughts on AI, responsible adoption, and practical skills for the modern world.
            </p>
          </div>

          {/* Search + Category */}
          <div className="flex flex-col md:flex-row gap-4 items-center px-4">
            {/* Search */}
            <div className="relative w-full md:flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search by title or author"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-9"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category — shadcn Select */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-56">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </header>

        {/* Post list */}
        {loading ? (
          <div>
            {Array.from({ length: 4 }).map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="py-12 text-center">
            <h3 className="text-lg font-medium text-slate-900">No posts found</h3>
            <p className="mt-2 text-slate-500">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <>
            <div>
              {posts.map((post) => (
                <BlogCard key={post.name} post={post} categoryMap={categoryMap} />
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}