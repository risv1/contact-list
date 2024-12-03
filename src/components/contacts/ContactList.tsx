import React from "react";
import ListCard from "./ContactCard";
import { remove } from "../../services/contact.svc";
import { ContactItem } from "../../types/contactItem";

type ListProps = {
    items: Array<ContactItem>;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const List: React.FC<ListProps> = ({ items, onEdit, onDelete }) => {
    const handleDelete = async (id: string) => {
        await remove(id);
        onDelete(id);
    };
    
    return (
        <div className="p-4 space-y-4">
            {items.map((item) => (
                <ListCard 
                    key={item.id} 
                    {...item} 
                    onEdit={() => onEdit(item.id)} 
                    onDelete={() => handleDelete(item.id)} 
                />
            ))}
        </div>
    );
}

export default List;
