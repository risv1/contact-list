import React, { useEffect, useState } from "react";
import { ContactItem } from "../../types/contactItem";
import Modal from "../misc/Modal";
import { create, getById, update } from "../../services/contact.svc";

type ContactModalProps = {
    id?: string;
    onClose: (id: string | undefined, formDetails: ContactItem) => void;
}

const ContactModal: React.FC<ContactModalProps> = ({
    id,
    onClose
}) => {
    const [formDetails, setFormDetails] = useState<ContactItem>({
        id: "",
        name: "",
        type: "Personal",
        mobile: "",
        email: ""
    });

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                const item = await getById(id);
                if (item) {
                    setFormDetails({
                        id: item.id,
                        name: item.name,
                        type: item.type,
                        mobile: item.mobile,
                        email: item.email
                    });
                }
            };
            fetchData();
        }
    }, [id]);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormDetails({
            ...formDetails,
            [name]: value
        });
    }

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (id) {
            update(id, formDetails)
        } else {
            create(formDetails)
        }

        onClose(id, formDetails);
        setFormDetails({
            id: "",
            name: "",
            type: "Personal",
            mobile: "",
            email: ""
        });
    }

    const handleModalClose = () => {
        onClose(id, formDetails);
    }
 
    return (
        <Modal onClose={handleModalClose}>
            <h1 className="text-3xl font-bold text-green-400 mb-8 text-center">{id ? "Edit Contact" : "Add Contact"}</h1>
            <form onSubmit={handleFormSubmit} className="space-y-4 p-6">
                <div>
                    <input
                        required
                        onChange={handleFormChange}
                        value={formDetails.name}
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="w-full px-3 py-2 bg-gray-800 border border-green-500 rounded-md shadow-sm text-green-100 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                </div>
                <div>
                    <select
                        required
                        onChange={handleFormChange}
                        value={formDetails.type}
                        name="type"
                        className="w-full px-3 py-2 bg-gray-800 border border-green-500 rounded-md shadow-sm text-green-100 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                        <option value="Personal">Personal</option>
                        <option value="Work">Work</option>
                    </select>
                </div>
                <div>
                    <input
                        required
                        onChange={handleFormChange}
                        value={formDetails.mobile}
                        type="tel"
                        name="mobile"
                        placeholder="Mobile"
                        className="w-full px-3 py-2 bg-gray-800 border border-green-500 rounded-md shadow-sm text-green-100 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                </div>
                <div>
                    <input
                        required
                        onChange={handleFormChange}
                        value={formDetails.email}
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full px-3 py-2 bg-gray-800 border border-green-500 rounded-md shadow-sm text-green-100 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-sm font-medium text-green-400 bg-gray-800 hover:bg-green-400 hover:text-green-900 border border-green-500 rounded-md shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    {id ? "Save" : "Submit"}
                </button>
            </form>
        </Modal>
    )
}

export default ContactModal;