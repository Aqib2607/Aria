import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import api from "../services/api";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Button } from "../components/ui/Button";

const careerGoalSchema = z.object({
  career_id: z.string().min(1, "Please select a career path"),
  current_skills: z.string().min(2, "Please list your current skills"),
});

type CareerGoalFormValues = z.infer<typeof careerGoalSchema>;

const AVAILABLE_CAREERS = [
  { id: "1", title: "MERN Developer" },
  { id: "2", title: "Frontend Developer" },
  { id: "3", title: "Backend Developer" },
  { id: "4", title: "Mobile App Developer" },
  { id: "5", title: "Data Scientist" },
  { id: "6", title: "AI Engineer" },
  { id: "7", title: "UI/UX Designer" },
  { id: "8", title: "Cybersecurity Engineer" },
];

export default function CareerGoals() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CareerGoalFormValues>({
    resolver: zodResolver(careerGoalSchema),
  });

  const onSubmit = async (data: CareerGoalFormValues) => {
    try {
      setLoading(true);
      await api.post("/careers", {
        target_role: data.career_id,
      });

      toast.success("Career goal saved successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save career goal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Career Goals</h1>
        <p className="text-muted-foreground mt-1">
          Select your desired career path and let Aria guide you.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Target Role</CardTitle>
            <CardDescription>
              What is your primary career objective?
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="career_id">Desired Career Path</Label>
                <select
                  id="career_id"
                  {...register("career_id")}
                  className={`flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors ${
                    errors.career_id ? "border-destructive focus-visible:ring-destructive" : ""
                  }`}
                >
                  <option value="" disabled>
                    Select a career...
                  </option>
                  {AVAILABLE_CAREERS.map((career) => (
                    <option key={career.id} value={career.id}>
                      {career.title}
                    </option>
                  ))}
                </select>
                {errors.career_id && (
                  <p className="text-xs text-destructive">{errors.career_id.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="current_skills">Existing Skills</Label>
                <Input
                  id="current_skills"
                  placeholder="e.g. HTML, CSS, JavaScript, React"
                  {...register("current_skills")}
                  className={errors.current_skills ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                <p className="text-xs text-muted-foreground">
                  Separate skills with a comma.
                </p>
                {errors.current_skills && (
                  <p className="text-xs text-destructive">{errors.current_skills.message}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t border-border pt-6 mt-2">
              <Button type="submit" isLoading={loading}>
                Save Career Goal
              </Button>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
