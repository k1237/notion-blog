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
        <h2 className="text-title text-shadow-black">PORTFOLIO</h2>
        <Main/>
      </main>
    </div>
  );
}
