import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_TOKEN = import.meta.env.VITE_COURSE_API_TOKEN;

export default function Enroll() {
    const { batchName } = useParams();
    const [batch, setBatch] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sessions, setSessions] = useState([]);
    const [payment, setPayment] = useState(null);

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

                // Set payment from batch
                setPayment(data.data?.price || null);
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
                // Fields we actually need
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

            toast.success("Enrollment submitted successfully!");
            setFormData({
                name1: "",
                email: "",
                organisation: "",
                highest_education_qualification: "",
                remarks: "",
            });
        } catch {
            toast.error("Failed to submit enrollment");
        }
    };

    if (loading)
        return <div className="py-20 text-center">Loading...</div>;

    const formatSessionTime = (session) => {
        if (!session.date || !session.time) return "Invalid Date";

        // Combine date + time
        const [hours, minutes, seconds] = session.time.split(":").map(Number);
        const [year, month, day] = session.date.split("-").map(Number);
        // Month is 0-indexed in JS Date
        const startDate = new Date(year, month - 1, day, hours, minutes, seconds);

        // Calculate end time using duration (in minutes)
        const endDate = new Date(startDate.getTime() + (session.duration || 0) * 60000);

        // Format date and time
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



    return (
        <div className="w-full bg-slate-50 py-14">
            <div className="max-w-6xl mx-auto px-4">

                {/* Page Title */}
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-10 text-center">
                    {batch.title}
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                    {/* LEFT – Course Info */}
                    <div className="lg:col-span-3 space-y-6">
                        <Card className="p-6 border-2 border-slate-100">
                            <h3 className="font-bold text-slate-900 mb-2">Course Description</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                {batch?.description || "—"}
                            </p>
                        </Card>

                        <Card className="p-6 border-2 border-slate-100">
                            <h3 className="font-bold text-slate-900 mb-2">Key Takeaways</h3>
                            {/* Render HTML safely */}
                            <div
                                className="text-slate-600 text-sm leading-relaxed"
                                dangerouslySetInnerHTML={{
                                    __html: batch?.batch_details || "—",
                                }}
                            />
                        </Card>

                        <Card className="p-6 border-2 border-slate-100">
                            <h3 className="font-bold text-slate-900 mb-3">
                                Session Timings
                            </h3>

                            {sessions.length === 0 ? (
                                <p className="text-sm text-slate-500">Session details will be updated soon.</p>
                            ) : (
                                <ul className="space-y-2 text-sm text-slate-700">
                                    {sessions.map((session, index) => (
                                        <li key={session.name}>
                                            <strong>Session {index + 1}:</strong>{" "}
                                            {formatSessionTime(session)}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {payment && (
                                <div className="mt-4 pt-4 border-t text-sm font-medium text-slate-900">
                                    Payment: ₹ {payment} + 18% GST
                                </div>
                            )}
                        </Card>

                        <Card className="p-6 border-2 border-slate-100">
                            <h3 className="font-bold text-slate-900 mb-2">Certification</h3>
                            <p className="text-slate-600 text-sm">
                                Certificate of completion will be provided.
                            </p>
                        </Card>
                    </div>

                    {/* RIGHT – Participant Form */}
                    <div className="lg:col-span-2">
                        <Card className="p-6 shadow-lg space-y-4">

                            <h3 className="font-bold text-slate-900">
                                Participant Information
                            </h3>

                            <div>
                                <label className="text-sm font-medium">Name *</label>
                                <Input
                                    value={formData.name1}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name1: e.target.value })
                                    }
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium">Email *</label>
                                <Input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium">Organisation</label>
                                <Input
                                    value={formData.organisation}
                                    onChange={(e) =>
                                        setFormData({ ...formData, organisation: e.target.value })
                                    }
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium">
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
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium">Purpose</label>
                                <Textarea
                                    value={formData.remarks}
                                    onChange={(e) =>
                                        setFormData({ ...formData, remarks: e.target.value })
                                    }
                                />
                            </div>

                            <Button
                                onClick={handleSubmit}
                                className="w-full bg-slate-900 hover:bg-slate-800"
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
