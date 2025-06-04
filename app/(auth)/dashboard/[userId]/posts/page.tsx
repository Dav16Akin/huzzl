import PostComponent from "@/components/PostComponent";


const posts = ({ params }: ParamProps) => {

  const userId = params.userId;

  return (
    <div>
      <PostComponent userId={userId} />
    </div>
  );
};

export default posts;
