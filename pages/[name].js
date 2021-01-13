import { useRouter } from "next/router";

const Name = () => {
  const router = useRouter();
  const query = router.query;
  const { name } = query;
  return (
    <div>
      <p> Hola {name}! biuenvendiod</p>
    </div>
  );
};

export default Name;
