import CreateHustleForm from "@/components/forms/CreateHustleForm";

export default async function create({ params }: ParamProps) {
  const userId = params?.userId;
  return (
    <div className="px-4 py-8">
      <CreateHustleForm userId={userId} />
    </div>
  );
}