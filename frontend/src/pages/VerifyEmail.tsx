import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import toast from "react-hot-toast";

import api from "../services/api";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Skeleton } from "../components/ui/Skeleton";

export default function VerifyEmail() {
  const { id, hash } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await api.get(`/email/verify/${id}/${hash}`);
        setStatus("success");
        setMessage(response.data.message || "Email verified successfully!");
        toast.success("Email verified!");
        setTimeout(() => navigate("/dashboard"), 3000);
      } catch (error: any) {
        setStatus("error");
        setMessage(error.response?.data?.message || "Verification failed");
      }
    };

    if (id && hash) {
      verifyEmail();
    }
  }, [id, hash, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-large border-border/50">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              {status === "verifying" && (
                <div className="relative flex h-16 w-16 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40 opacity-75"></span>
                  <div className="relative inline-flex rounded-full h-12 w-12 bg-primary items-center justify-center">
                    <span className="text-primary-foreground text-sm font-medium">...</span>
                  </div>
                </div>
              )}
              {status === "success" && (
                <CheckCircle2 className="h-16 w-16 text-success animate-in zoom-in duration-300" />
              )}
              {status === "error" && (
                <XCircle className="h-16 w-16 text-destructive animate-in zoom-in duration-300" />
              )}
            </div>
            <CardTitle className="text-2xl">Email Verification</CardTitle>
            <CardDescription>
              {status === "verifying" && "Please wait while we verify your email address..."}
              {status === "success" && "Verification successful"}
              {status === "error" && "Verification failed"}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            {status === "verifying" ? (
              <div className="space-y-2 mt-4">
                <Skeleton className="h-4 w-3/4 mx-auto" />
                <Skeleton className="h-4 w-1/2 mx-auto" />
              </div>
            ) : (
              <p className="text-foreground mt-2">{message}</p>
            )}
          </CardContent>
          <CardFooter className="flex justify-center pt-6">
            <Link to="/login" className="w-full">
              <Button variant="outline" className="w-full">
                Return to Login
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
