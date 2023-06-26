import styles from "@/styles/portfolio.module.css";
import CustomHead from "@/components/parts/CustomHead";
import Main from "@/components/views/portfolio/Main";

export default function Portfolio() {
  return (
    <div>
      <CustomHead
        title="PORTFOLIO"
        description="ポートフォリオページです。"
      />
      <main
        id={styles.portfolio}
        className="container w-10/12 mt-16 mx-auto h-900"
      >
        <h1 className="text-4xl font-bold text-center">PORTFOLIO</h1>
        <Main/>
      </main>
    </div>
  );
}
