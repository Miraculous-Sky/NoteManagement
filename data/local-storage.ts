import AsyncStorage from "@react-native-async-storage/async-storage";
import Note from "@/models/note";
import Label from "@/models/label";
import Folder from "@/models/folder";
import { COLORS, LABELS, NOTES, TRASH, FOLDERS } from "@/data/dummy-data";

/**
 * Deals with the local storage of Notes, Colors, Labels, Folders, and Trash items using dummy data
 *
 * @class LocalStorage
 */
class MemoryStorage {
    noteLargestId: number = 0;
    labelLargestId: number = 0;
    folderLargestId: number = 0;

    constructor() {
        this.initializeStorage();
    }

    /**
     * Initialize the local storage with dummy data
     *
     * @memberof LocalStorage
     */
    async initializeStorage() {
        this.noteLargestId = NOTES.length;
        this.labelLargestId = LABELS.length;
        this.folderLargestId = FOLDERS.length;
    }

    // Note functions
    getNextNoteId(): string {
        return "n" + (this.noteLargestId + 1);
    }

    async getNote(noteId: string): Promise<Note | null> {
        return new Promise((resolve) => {
            const note = NOTES.find((note) => note.id === noteId) || null;
            resolve(note);
        });
    }

    async setNote(note: Note): Promise<void> {
        return new Promise((resolve) => {
            const existingIndex = NOTES.findIndex((n) => n.id === note.id);
            if (existingIndex !== -1) {
                NOTES[existingIndex] = note;
            } else {
                NOTES.push(note);
                this.noteLargestId++;
            }
            resolve();
        });
    }

    async deleteNote(noteId: string): Promise<void> {
        return new Promise((resolve) => {
            const index = NOTES.findIndex((note) => note.id === noteId);
            if (index !== -1) {
                NOTES.splice(index, 1);
            }
            resolve();
        });
    }

    async getAllNotes(): Promise<Note[]> {
        return new Promise((resolve) => {
            resolve(NOTES);
        });
    }

    // Color functions
    async getColor(colorIndex: number): Promise<string | null> {
        return new Promise((resolve) => {
            const color = COLORS[colorIndex] || null;
            resolve(color);
        });
    }

    async setColor(color: string, colorIndex: number): Promise<void> {
        return new Promise((resolve) => {
            COLORS[colorIndex] = color;
            resolve();
        });
    }

    async deleteColor(colorIndex: number): Promise<void> {
        return new Promise((resolve) => {
            COLORS.splice(colorIndex, 1);
            resolve();
        });
    }

    async getAllColors(): Promise<string[]> {
        return new Promise((resolve) => {
            resolve(COLORS);
        });
    }

    // Label functions
    getNextLabelId(): string {
        return "l" + (this.labelLargestId + 1);
    }

    async getLabel(labelId: string): Promise<Label | null> {
        return new Promise((resolve) => {
            const label = LABELS.find((label) => label.id === labelId) || null;
            resolve(label);
        });
    }

    async setLabel(label: Label): Promise<void> {
        return new Promise((resolve) => {
            const existingIndex = LABELS.findIndex((l) => l.id === label.id);
            if (existingIndex !== -1) {
                LABELS[existingIndex] = label;
            } else {
                LABELS.push(label);
                this.labelLargestId++;
            }
            resolve();
        });
    }

    async deleteLabel(labelId: string): Promise<void> {
        return new Promise((resolve) => {
            const index = LABELS.findIndex((label) => label.id === labelId);
            if (index !== -1) {
                LABELS.splice(index, 1);
            }
            resolve();
        });
    }

    async getAllLabels(): Promise<Label[]> {
        return new Promise((resolve) => {
            resolve(LABELS);
        });
    }

    // Trash functions
    async getTrash(noteId: string): Promise<Note | null> {
        return new Promise((resolve) => {
            const note = TRASH.find((note) => note.id === noteId) || null;
            resolve(note);
        });
    }

    async setTrash(note: Note): Promise<void> {
        return new Promise((resolve) => {
            const existingIndex = TRASH.findIndex((n) => n.id === note.id);
            if (existingIndex !== -1) {
                TRASH[existingIndex] = note;
            } else {
                TRASH.push(note);
            }
            resolve();
        });
    }

    async deleteTrash(noteId: string): Promise<void> {
        return new Promise((resolve) => {
            const index = TRASH.findIndex((note) => note.id === noteId);
            if (index !== -1) {
                TRASH.splice(index, 1);
            }
            resolve();
        });
    }

    async getAllTrash(): Promise<Note[]> {
        return new Promise((resolve) => {
            resolve(TRASH);
        });
    }

    // Folder functions
    getNextFolderId(): string {
        return "f" + (this.folderLargestId + 1);
    }

    async getFolder(folderId: string): Promise<Folder | null> {
        return new Promise((resolve) => {
            const folder =
                FOLDERS.find((folder) => folder.id === folderId) || null;
            resolve(folder);
        });
    }

    async setFolder(folder: Folder): Promise<void> {
        return new Promise((resolve) => {
            const existingIndex = FOLDERS.findIndex((f) => f.id === folder.id);
            if (existingIndex !== -1) {
                FOLDERS[existingIndex] = folder;
            } else {
                FOLDERS.push(folder);
                this.folderLargestId++;
            }
            resolve();
        });
    }

    async deleteFolder(folderId: string): Promise<void> {
        return new Promise((resolve) => {
            const index = FOLDERS.findIndex((folder) => folder.id === folderId);
            if (index !== -1) {
                FOLDERS.splice(index, 1);
            }
            resolve();
        });
    }

    async getAllFolders(): Promise<Folder[]> {
        return new Promise((resolve) => {
            resolve(FOLDERS);
        });
    }
}

const memoryStorage = new MemoryStorage();

/**
 * Deals with the local storage of Notes, Colors, Labels, Folders, and Trash items into AsyncStorage
 *
 * @class LocalStorage
 */
class LocalStorage {
    noteLargestId: number = 0;
    labelLargestId: number = 0;
    folderLargestId: number = 0;

    constructor() {
        this.initializeStorage();
    }

    /**
     * Initialize the local storage with dummy data
     *
     * @memberof LocalStorage
     */
    async initializeStorage() {
        await Promise.all([
            AsyncStorage.clear(),
            ...COLORS.map((color, index) => this.setColor(color, index)),
            ...LABELS.map((label) => this.setLabel(label)),
            ...NOTES.map((note) => this.setNote(note)),
            ...TRASH.map((note) => this.setTrash(note)),
            ...FOLDERS.map((folder) => this.setFolder(folder)),
        ]);
    }

    // Note functions
    getNextNoteId(): string {
        return "n" + (this.noteLargestId + 1);
    }

    async getNote(noteId: string): Promise<Note | null> {
        const json = await AsyncStorage.getItem(`@note:${noteId}`);
        return json ? (JSON.parse(json) as Note) : null;
    }

    async setNote(note: Note): Promise<void> {
        const id = parseInt(note.id.replace("n", ""));
        if (id > this.noteLargestId) this.noteLargestId = id;
        await AsyncStorage.setItem(`@note:${note.id}`, JSON.stringify(note));
    }

    async deleteNote(noteId: string): Promise<void> {
        await AsyncStorage.removeItem(`@note:${noteId}`);
    }

    async getAllNotes(): Promise<Note[]> {
        const keys = await AsyncStorage.getAllKeys();
        const fetchKeys = keys.filter((k) => k.startsWith("@note:"));
        const result = await AsyncStorage.multiGet(fetchKeys);

        return result
            .filter(([_, value]) => value !== null)
            .map(([_, value]) => JSON.parse(value!) as Note);
    }

    // Color functions
    async getColor(colorIndex: number): Promise<string | null> {
        const json = await AsyncStorage.getItem(`@color:${colorIndex}`);
        return json ? JSON.parse(json) : null;
    }

    async setColor(color: string, colorIndex: number): Promise<void> {
        await AsyncStorage.setItem(
            `@color:${colorIndex}`,
            JSON.stringify(color)
        );
    }

    async deleteColor(colorIndex: number): Promise<void> {
        await AsyncStorage.removeItem(`@color:${colorIndex}`);
    }

    async getAllColors(): Promise<string[]> {
        const keys = await AsyncStorage.getAllKeys();
        const fetchKeys = keys.filter((k) => k.startsWith("@color:"));
        const result = await AsyncStorage.multiGet(fetchKeys);

        return result
            .filter(([_, value]) => value !== null)
            .map(([_, value]) => JSON.parse(value!) as string);
    }

    // Label functions
    getNextLabelId(): string {
        return "l" + (this.labelLargestId + 1);
    }

    async getLabel(labelId: string): Promise<Label | null> {
        const json = await AsyncStorage.getItem(`@label:${labelId}`);
        return json ? (JSON.parse(json) as Label) : null;
    }

    async setLabel(label: Label): Promise<void> {
        const id = parseInt(label.id.replace("l", ""));
        if (id > this.labelLargestId) this.labelLargestId = id;
        await AsyncStorage.setItem(`@label:${label.id}`, JSON.stringify(label));
    }

    async deleteLabel(labelId: string): Promise<void> {
        await AsyncStorage.removeItem(`@label:${labelId}`);
    }

    async getAllLabels(): Promise<Label[]> {
        const keys = await AsyncStorage.getAllKeys();
        const fetchKeys = keys.filter((k) => k.startsWith("@label:"));
        const result = await AsyncStorage.multiGet(fetchKeys);

        return result
            .filter(([_, value]) => value !== null)
            .map(([_, value]) => JSON.parse(value!) as Label);
    }

    // Trash functions
    async getTrash(noteId: string): Promise<Note | null> {
        const json = await AsyncStorage.getItem(`@trash:${noteId}`);
        return json ? (JSON.parse(json) as Note) : null;
    }

    async setTrash(note: Note): Promise<void> {
        const id = parseInt(note.id.replace("n", ""));
        if (id > this.noteLargestId) this.noteLargestId = id;
        await AsyncStorage.setItem(`@trash:${note.id}`, JSON.stringify(note));
    }

    async deleteTrash(noteId: string): Promise<void> {
        await AsyncStorage.removeItem(`@trash:${noteId}`);
    }

    async getAllTrash(): Promise<Note[]> {
        const keys = await AsyncStorage.getAllKeys();
        const fetchKeys = keys.filter((k) => k.startsWith("@trash:"));
        const result = await AsyncStorage.multiGet(fetchKeys);

        return result
            .filter(([_, value]) => value !== null)
            .map(([_, value]) => JSON.parse(value!) as Note);
    }

    // Folder functions
    getNextFolderId(): string {
        return "f" + (this.folderLargestId + 1);
    }

    async getFolder(folderId: string): Promise<Folder | null> {
        const json = await AsyncStorage.getItem(`@folder:${folderId}`);
        return json ? (JSON.parse(json) as Folder) : null;
    }

    async setFolder(folder: Folder): Promise<void> {
        const id = parseInt(folder.id.replace("f", ""));
        if (id > this.folderLargestId) this.folderLargestId = id;
        await AsyncStorage.setItem(
            `@folder:${folder.id}`,
            JSON.stringify(folder)
        );
    }

    async deleteFolder(folderId: string): Promise<void> {
        await AsyncStorage.removeItem(`@folder:${folderId}`);
    }

    async getAllFolders(): Promise<Folder[]> {
        const keys = await AsyncStorage.getAllKeys();
        const fetchKeys = keys.filter((k) => k.startsWith("@folder:"));
        const result = await AsyncStorage.multiGet(fetchKeys);

        return result
            .filter(([_, value]) => value !== null)
            .map(([_, value]) => JSON.parse(value!) as Folder);
    }
}

const localStorage = new LocalStorage();

export default localStorage; // localStorage or memoryStorage
