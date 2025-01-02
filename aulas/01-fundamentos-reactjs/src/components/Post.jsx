import { useState } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Avatar } from './Avatar'
import { Comment } from './Comment'
import styles from './Post.module.css'

export function Post({ author, publishedAt, content }) {
    const publishedAtObj = new Date(publishedAt);

    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR
    });

    const publishedRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true
    })

    const [comments, setComments] = useState(["Muito bacana!"]);
    const [newCommentText, setNewCommentText] = useState('');

    function handleCreateNewComment(event) {
        event.preventDefault();

        setComments([...comments, newCommentText]);
        setNewCommentText('');
    }

    function handleNewCommentChange(event) {
        setNewCommentText(event.target.value);
    }

    function onDeleteComment(commentToDelete) {
        const commentsWithoutDeletedOne = comments.filter(
            comment => comment !== commentToDelete
        );

        setComments(commentsWithoutDeletedOne);
    }

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarURL} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time
                    title={publishedDateFormatted}
                    dateTime={publishedAtObj.toISOString()}
                >
                    {publishedRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                {content.map((line) => {
                    if (line.type === 'paragraph') {
                        return <p key={line.content}>{line.content}</p>
                    } else if (line.type === 'link') {
                        return <p key={line.content}><a href={'#'}>{line.content}</a></p>
                    }
                })}
            </div>

            <form
                onSubmit={handleCreateNewComment}
                className={styles.commentForm}

            >
                <strong>Deixe seu feedback</strong>

                <textarea
                    placeholder="Deixe um comentário..."
                    onChange={handleNewCommentChange}
                    value={newCommentText}
                />

                <footer>
                    <button type='submit' >Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => {
                    return (
                        <Comment
                            key={comment}
                            content={comment}
                            onDeleteComment={onDeleteComment}
                        />
                    )
                })}
            </div>
        </article>
    )
}