import styles from "./Tabs.module.css";

interface TabsProps {
  activeTab: "create" | "join";
  onTabChange: (tab: "create" | "join") => void;
}

export function Tabs({ activeTab, onTabChange }: TabsProps) {
  return (
    <div className={styles.container}>
      <button
        type="button"
        className={`${styles.tab} ${activeTab === "create" ? styles.active : ""}`.trim()}
        onClick={() => onTabChange("create")}
      >
        Crear Partida
      </button>
      <button
        type="button"
        className={`${styles.tab} ${activeTab === "join" ? styles.active : ""}`.trim()}
        onClick={() => onTabChange("join")}
      >
        Unirse a Partida
      </button>
    </div>
  );
}
