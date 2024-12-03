import React from "react";
import List from "./components/contacts/ContactList";
import ContactModal from "./components/contacts/ContactModal";
import { ContactItem } from "./types/contactItem";
import { get } from "./services/contact.svc";

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState<{
    isOpen: boolean;
    id: string | null;
  }>({
    isOpen: false,
    id: null,
  });
  const [items, setItems] = React.useState<Array<ContactItem>>([]);

  React.useEffect(() => {
    const fetchItems = async () => {
      const items = await get();
      setItems(items);
    }
    fetchItems();
  }, [isModalOpen]);

  const handleAdd = () => {
    setIsModalOpen({
      isOpen: true,
      id: null,
    });
  }

  const handleEdit = (id: string) => {
    setIsModalOpen({
      isOpen: true,
      id,
    });
  }

  const handleModalClose = (id: string | undefined, item: ContactItem) => {
    setIsModalOpen({
      isOpen: false,
      id: null,
    })
    if (!id) {
      setItems([...items, item]);
    } else {
      const newItems = items.map((item) => {
        if (item.id === id) {
          return item;
        }
        return item;
      });
      setItems(newItems);
    }
  }

  const handleDelete = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-green-400 mb-8 text-center">
          Contact List
        </h1>

        <div className="mb-6">
          <button
            onClick={handleAdd}
            className="inline-flex items-center px-4 py-2 border border-green-500 rounded-md shadow-sm text-sm text-green-400 bg-black hover:bg-green-400 hover:text-green-900 font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Add Contact
          </button>
        </div>

        <div className="bg-gray-900 shadow-lg rounded-lg border border-green-900">
          <List
            items={items}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        {isModalOpen.isOpen && (
          <ContactModal
            onClose={handleModalClose}
            id={isModalOpen.id ? isModalOpen.id : ""}
          />
        )}
      </div>
    </div>
  );
}

export default App;