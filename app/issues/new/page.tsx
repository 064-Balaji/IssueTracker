"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, Form, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        console.log(data);
        await axios.post("/api/issues", data);
        router.push("/issues");
      })}
      className="flex flex-col w-full gap-4">
      <TextField.Input placeholder="title" {...register("title")} />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />
      <Button>Create Issue</Button>
    </form>
  );
};

export default NewIssuePage;
