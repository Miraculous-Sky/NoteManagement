class Note {
    constructor(
        id,
        color,
        labelIds,
        content,
        createAt,
        updateAt,
        isBookmarked,
        deleteAt = null
    ) {
        this.id = id;
        this.color = color;
        this.labelIds = labelIds;
        this.content = content;
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.isBookmarked = isBookmarked;
        this.deleteAt = deleteAt;
    }
}

export default Note;
