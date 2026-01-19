import { redirect } from "next/navigation";
import Header from "@/components/Header";
import { auth } from "@/lib/auth";
import OutlinerEditor from "@/components/OutlinerEditor";

export const metadata = {
  title: "Editor",
};

export default async function EditorPage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <>
      <Header />
      <hr />
      <OutlinerEditor title="My Notes" />
    </>
  );
}
