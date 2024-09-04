import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ChatForm() {
  const { toast } = useToast();
  const schema = z.object({
    name: z.string(),
    email: z.string(),
    message: z.string(),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", message: "" },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      toast({
        title: "something went wrong!",
        description: "unable to send message, please try again later",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "message sent!",
      description: "i'll reach back to you soon!",
    });
  }

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-1 gap-4 md:grid-cols-2 "
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  className="placeholder:text-muted-foreground/80"
                  {...field}
                  placeholder="Enter your name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className="placeholder:text-muted-foreground/80"
                  {...field}
                  placeholder="Enter your email address"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Convey your message..."
                  className="min-h-[150px] resize-none placeholder:text-muted-foreground/80"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-fit">
          {form.formState.isSubmitting ? (
            <Button disabled={true}>Submitting</Button>
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </div>
      </form>
    </Form>
  );
}
