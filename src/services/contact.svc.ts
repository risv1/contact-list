import { v4 as uuidv4 } from "uuid";
import type { ContactItem } from "../types/contactItem";

let items: Array<ContactItem> = [];

const dummyItems: Array<ContactItem> = [
    {
        id: "1",
        name: "John Doe",
        type: "Personal",
        mobile: "1234567890",
        email: "johndoe@gmail.com",
    },
    {
        id: "2",
        name: "Jane Doe",
        type: "Work",
        mobile: "0987654321",
        email: "janedoe@gmail.com"
    },
    {
        id: "3",
        name: "John Smith",
        type: "Personal",
        mobile: "1234567890",
        email: "johnsmith@gmail.com"
    },
    {
        id: "4",
        name: "Jane Smith",
        type: "Work",
        mobile: "0987654321",
        email: "janesmith@gmail.com",
    },
    {
        id: "5",
        name: "William Doe",
        type: "Personal",
        mobile: "1234567890",
        email: "williamdoe@gmail.com",
    }
]

export const get = async () => {
    if (items.length === 0) {
        items = [...dummyItems];
    }
    return items;
};

export const getById = async (id: string) => {
    return items.find((item) => item.id === id);
}

export const create = (details: ContactItem) => {
    const newItem: ContactItem = {
        id: uuidv4(),
        name: details.name,
        type: details.type,
        mobile: details.mobile,
        email: details.email,
    };

    items = [...items, newItem];
    return items;
}

export const update = (id: string, updatedContact: ContactItem): Array<ContactItem> => {
    items = items.map(item => {
        if (item.id === id) {
            return {
                ...item,
                ...updatedContact
            };
        }
        return item;
    });
    return items;
};

export const remove = (id: string) => {
    items = items.filter((item) => item.id !== id);
    return items;
}