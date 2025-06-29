import { PencilLine } from 'phosphor-react'
import { Avatar } from './Avatar.tsx'
import styles from './Sidebar.module.css'

export function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <img
                className={styles.cover}
                src='https://images.unsplash.com/photo-1511376777868-611b54f68947?q=50&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            />

            <div className={styles.profile}>
                <Avatar src={'https://avatars.githubusercontent.com/u/82000177?v=4'} />
                <strong>Washington Moreno</strong>
                <span>Web developer</span>
            </div>

            <footer>
                <a href="#">
                    <PencilLine size={20} />
                    Editar seu perfil.
                </a>
            </footer>
        </aside>
    )
}
