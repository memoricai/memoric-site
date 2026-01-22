import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { CheckCircle } from "lucide-react";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_TOKEN = import.meta.env.VITE_COURSE_API_TOKEN;

export default function Enroll() {
    const { batchName } = useParams();
    const navigate = useNavigate();
    const [batch, setBatch] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sessions, setSessions] = useState([]);
    const [showThankYou, setShowThankYou] = useState(false);

    const [formData, setFormData] = useState({
        name1: "",
        email: "",
        organisation: "",
        highest_education_qualification: "",
        remarks: "",
    });

    /* ---------------- Fetch batch details ---------------- */
    useEffect(() => {
        const fetchBatch = async () => {
            try {
                const res = await fetch(
                    `${BASE_URL}/api/resource/LMS Batch/${batchName}`,
                    {
                        headers: {
                            Authorization: `token ${API_TOKEN}`,
                        },
                    }
                );
                const data = await res.json();
                setBatch(data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBatch();
    }, [batchName]);

    /* ---------------- Fetch session timings ---------------- */
    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const fields = encodeURIComponent(JSON.stringify([
                    "name",
                    "title",
                    "date",
                    "time",
                    "duration"
                ]));

                const filters = encodeURIComponent(JSON.stringify([
                    ["batch_name", "=", batchName]
                ]));

                const res = await fetch(
                    `${BASE_URL}/api/resource/LMS Live Class?fields=${fields}&filters=${filters}&order_by=date asc`,
                    {
                        headers: {
                            Authorization: `token ${API_TOKEN}`,
                        },
                    }
                );

                const data = await res.json();
                if (!res.ok) throw new Error();

                setSessions(data.data || []);
            } catch (err) {
                console.error(err);
                toast.error("Failed to load session timings");
            }
        };

        fetchSessions();
    }, [batchName]);

    /* ---------------- Payment calculation ---------------- */
    const calculatePayment = (totalAmount) => {
        const baseAmount = Math.round(totalAmount / 1.18);
        return baseAmount;
    };

    /* ---------------- Submit form ---------------- */
    const handleSubmit = async () => {
        const { name1, email } = formData;

        if (!name1 || !email) {
            toast.error("Name and Email are required");
            return;
        }

        try {
            const res = await fetch(
                `${BASE_URL}/api/resource/Batch Waitlist`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `token ${API_TOKEN}`,
                    },
                    body: JSON.stringify({
                        batch: batchName,
                        ...formData,
                    }),
                }
            );

            const data = await res.json();
            if (!res.ok || data.exc) throw new Error();

            // Show thank you message
            setShowThankYou(true);

            // Redirect after 3 seconds
            setTimeout(() => {
                navigate('/');
            }, 3000);

        } catch {
            toast.error("Failed to submit enrollment");
        }
    };

    if (loading)
        return <div className="py-20 text-center">Loading...</div>;

    // Thank You Modal/Screen
    if (showThankYou) {
        return (
            <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <Card className="max-w-md w-full p-8 text-center space-y-6 animate-in fade-in zoom-in duration-300 gap-2">
                    <div className="flex justify-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-12 h-12 text-green-600" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-slate-900">
                            Thank You!
                        </h2>
                        <p className="text-slate-600">
                            Your enrollment has been submitted successfully.
                        </p>
                        <p className="text-sm text-slate-500">
                            Redirecting to home page...
                        </p>
                    </div>
                </Card>
            </div>
        );
    }

    const formatSessionTime = (session) => {
        if (!session.date || !session.time) return "Invalid Date";

        const [hours, minutes, seconds] = session.time.split(":").map(Number);
        const [year, month, day] = session.date.split("-").map(Number);
        const startDate = new Date(year, month - 1, day, hours, minutes, seconds);
        const endDate = new Date(startDate.getTime() + (session.duration || 0) * 60000);

        const dateStr = startDate.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

        const startStr = startDate.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
        });

        const endStr = endDate.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
        });

        return `${dateStr} ${startStr} – ${endStr}`;
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        return new Date(dateStr).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const formatTime = (timeStr) => {
        if (!timeStr) return "";
        const [h, m] = timeStr.split(":");
        const d = new Date();
        d.setHours(h, m);
        return d.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="w-full bg-slate-50 py-14">
            <div className="max-w-6xl mx-auto px-4">

                {/* Page Title */}
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-10 text-center">
                    Memoric AI - [{batch.title}]
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                    {/* LEFT – Course Info (3 columns) */}
                    <div className="lg:col-span-3 space-y-6">

                        {/* Introduction */}
                        <Card className="p-6 border-2 border-slate-100 gap-2">
                            <h3 className="font-bold text-slate-900 mb-4 text-xl">Introduction</h3>
                            <div className="space-y-3 text-sm text-slate-700">
                                {batch?.description || "—"}
                            </div>
                        </Card>

                        {/* Course Description */}
                        <Card className="p-6 border-2 border-slate-100 gap-2">
                            <h3 className="font-bold text-slate-900 mb-3 text-xl">Description</h3>
                            <div
                                className="text-slate-600 text-sm leading-relaxed prose prose-sm max-w-none"
                                dangerouslySetInnerHTML={{
                                    __html: batch?.batch_details || "—",
                                }}
                            />
                        </Card>

                        {/* Certification */}
                        {batch?.certification === 1 && (
                            <Card className="p-6 border-2 border-slate-100 gap-2">
                                <h3 className="font-bold text-slate-900 mb-2 text-xl">Certification</h3>
                                <p className="text-slate-600 text-sm">
                                    Candidates who successfully complete this course will earn a Course Certificate from Memoric AI.
                                </p>
                            </Card>
                        )}
                    </div>


                    {/* RIGHT – Session Details & Form (2 columns) */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Session Timings & Payment */}
                        <Card className="p-6 border-2 border-slate-100 bg-white top-24 gap-2">
                            <h3 className="font-bold text-slate-900 mb-4 text-xl">
                                Session Details
                            </h3>

                            {sessions.length === 0 ? (
                                <p className="text-sm text-slate-500">
                                    Session details will be updated soon.
                                </p>
                            ) : (
                                <ul className="space-y-2 text-sm text-slate-700">
                                    {sessions.map((session, index) => (
                                        <li key={session.name} className="pb-2 border-b border-slate-100 last:border-0">
                                            <strong className="text-slate-900">
                                                {session.title || `Session ${index + 1}`}:
                                            </strong>
                                            <div className="text-xs text-slate-600 mt-1">
                                                {formatSessionTime(session)}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {/* Payment Info */}
                            {batch?.amount > 0 && (
                                <div className="pt-4 border-t border-slate-200">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-semibold text-slate-900">
                                            Course Fee:
                                        </span>
                                        <span className="text-lg font-bold text-slate-900">
                                            ₹{calculatePayment(batch.amount) || 0} + 18% GST
                                        </span>
                                    </div>
                                </div>
                            )}

                            {batch?.paid_batch === 0 && (
                                <div className="pt-4 border-t border-slate-200">
                                    <span className="text-sm font-semibold text-green-600">
                                        Free Course
                                    </span>
                                </div>
                            )}
                        </Card>

                        {/* Enrollment Form */}
                        <Card className="p-6 shadow-lg space-y-2 border-2 border-slate-100 gap-2">

                            <h3 className="font-bold text-slate-900 text-xl">
                                Enrollment Form
                            </h3>

                            <div>
                                <label className="text-sm font-medium text-slate-900">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    value={formData.name1}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name1: e.target.value })
                                    }
                                    placeholder="Your full name"
                                    className="mt-1"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-900">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    placeholder="your.email@example.com"
                                    className="mt-1"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-900">
                                    Organisation
                                </label>
                                <Input
                                    value={formData.organisation}
                                    onChange={(e) =>
                                        setFormData({ ...formData, organisation: e.target.value })
                                    }
                                    placeholder="Your company or institution"
                                    className="mt-1"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-900">
                                    Educational / Professional Background
                                </label>
                                <Input
                                    value={formData.highest_education_qualification}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            highest_education_qualification: e.target.value,
                                        })
                                    }
                                    placeholder="e.g., MBA, B.Tech, Professional"
                                    className="mt-1"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-900">
                                    Purpose
                                </label>
                                <Textarea
                                    value={formData.remarks}
                                    onChange={(e) =>
                                        setFormData({ ...formData, remarks: e.target.value })
                                    }
                                    placeholder="Why are you interested in this course?"
                                    className="mt-1"
                                    rows={3}
                                />
                            </div>

                            <Button
                                onClick={handleSubmit}
                                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3"
                            >
                                Submit Enrollment
                            </Button>

                        </Card>
                    </div>

                </div>
            </div>
        </div>
    );
}
