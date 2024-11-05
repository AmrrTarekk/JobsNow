import styles from "./styles.module.scss";
type Props = {
  name: string;
};

function SkillTag({ name }: Props) {
  return (
    <div className={styles.skillTag}>
      <span data-testid="skillTag">{name}</span>
    </div>
  );
}

export default SkillTag;
