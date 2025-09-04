import type { ReactNode } from "react"
import styles from './Card.module.scss'

interface CardProps {
    title: string
    children: ReactNode
}

export default function Card({ title, children }: CardProps) {
    return (
        <div className={styles.card}>
            <h3 className={styles.cardTitle}>{title}</h3>
            {children}
        </div>
    )
}