import MainPC from "@/components/views/profile/MainPC";
import MainSP from "@/components/views/profile/MainSP";
import CustomHead from "@/components/parts/CustomHead";

export default function Home() {
  return (
    <div>
      <CustomHead
        title="PROFILE"
        description="プロフィールページです。"
      />
      <main className="container w-full mt-16 mx-auto h-900">
        <h1 className="text-4xl font-bold text-center">PROFILE</h1>
        <MainPC/>
        <MainSP/>
      </main>
    </div>
  );
}
