import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import api from "../services/api";
import { useAuthStore } from "../store/authStore";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Button } from "../components/ui/Button";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  password: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function Profile() {
  const { user, setAuth, token } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({ name: user.name });
    }
  }, [user, reset]);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      setLoading(true);
      const response = await api.put("/profiles/me", data);
      if (response.data.user) {
        setAuth(response.data.user, token || "");
      }
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Profile Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account settings and preferences.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <Card className="border-dashed">
          <CardContent className="flex items-center gap-6 py-6">
            <div className="h-16 w-16 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center shrink-0">
              <span className="text-2xl font-bold text-primary">{user?.name?.charAt(0)?.toUpperCase() || 'U'}</span>
            </div>
            <div>
              <p className="font-semibold text-xl text-foreground">{user?.name}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <span className={`inline-flex items-center mt-2 rounded-full px-2.5 py-0.5 text-xs font-semibold border ${
                user?.role === 'admin' 
                  ? 'bg-destructive/10 text-destructive border-destructive/20' 
                  : 'bg-primary/10 text-primary border-primary/20'
              }`}>
                {user?.role === 'admin' ? '⚡ Admin' : '👤 User'}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your personal details here.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  {...register("name")}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  disabled
                  value={user?.email || ""}
                  className="bg-muted text-muted-foreground cursor-not-allowed"
                />
                <p className="text-xs text-muted-foreground">
                  Your email address cannot be changed.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-border">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Leave blank to keep current password"
                  {...register("password")}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t border-border pt-6 mt-2">
              <Button type="submit" isLoading={loading}>
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
