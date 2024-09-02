import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import React, { type FormEvent } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ChatForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const formObject = Object.fromEntries(formData.entries()); // Convert FormData to an object
    const jsonData = JSON.stringify(formObject); // Convert the object to a JSON string

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: jsonData,
    });

    if (!res.ok) {
      toast({
        title: "something went wrong!",
        description: "Unable to send message, please try again later",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "message sent!",
      description: "i'll reach back to you soon!",
    });

    setIsLoading(false);
    return;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full grid grid-cols-1 gap-4 md:grid-cols-2"
    >
      <div className="space-y-1">
        <Label className="font-medium" htmlFor="name">
          name
        </Label>
        <Input name="name" id="name" disabled={isLoading} />
      </div>
      <div className="space-y-1">
        <Label className="font-medium" htmlFor="email">
          email
        </Label>
        <Input name="email" id="email" disabled={isLoading} />
      </div>
      <div className="space-y-1 md:col-span-2">
        <Label className="font-medium" htmlFor="message">
          message
        </Label>
        <Textarea name="message" id="message" disabled={isLoading} />
      </div>
      <div className="w-fit">
        {isLoading ? (
          <Button id="submit-button" disabled={true}>
            Submitting...
          </Button>
        ) : (
          <Button>Submit</Button>
        )}
      </div>
    </form>
  );
}
