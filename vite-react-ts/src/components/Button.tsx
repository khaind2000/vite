import styles from './Button.module.scss'

type Props = {
  label: string
}

export default function Button({ label }: Props) {
  return <button className={styles.btn}>{label}</button>
}