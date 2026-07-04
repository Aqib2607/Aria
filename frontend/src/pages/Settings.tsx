import { useState } from "react";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, Bell, Shield, Moon } from "lucide-react";
import toast from "react-hot-toast";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Label } from "../components/ui/Label";
import ThemeToggle from "../components/ThemeToggle";

export default function Settings() {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast.success("Settings saved successfully!");
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <SettingsIcon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account preferences and application settings.
          </p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Notifications
              </CardTitle>
              <CardDescription>Configure how you want to receive alerts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive weekly progress reports.</p>
                </div>
                <button 
                  type="button" 
                  aria-label="Toggle Email Notifications"
                  onClick={() => setEmailNotifs(!emailNotifs)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${emailNotifs ? 'bg-primary' : 'bg-muted'}`}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${emailNotifs ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive real-time alerts in browser.</p>
                </div>
                <button 
                  type="button" 
                  aria-label="Toggle Push Notifications"
                  onClick={() => setPushNotifs(!pushNotifs)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${pushNotifs ? 'bg-primary' : 'bg-muted'}`}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${pushNotifs ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button onClick={handleSave} isLoading={saving} className="w-full sm:w-auto">Save Preferences</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Moon className="h-5 w-5 text-primary" />
                Appearance
              </CardTitle>
              <CardDescription>Customize the look and feel of Aria.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Theme Mode</Label>
                  <p className="text-sm text-muted-foreground">Toggle between light and dark mode.</p>
                </div>
                <ThemeToggle />
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 border-destructive/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Shield className="h-5 w-5" />
                Danger Zone
              </CardTitle>
              <CardDescription>Irreversible and destructive actions.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <Button variant="destructive">Delete Account</Button>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
