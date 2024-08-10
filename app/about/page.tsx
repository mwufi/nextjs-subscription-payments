import { db } from "@/db/index";
import { usersTable } from "@/db/schema";
import { redirect } from 'next/navigation';


async function getUsers() {
    const users = await db.select().from(usersTable)
    return users
}


const InputField = ({ id, name, type, label, required }: {
    id: string;
    name: string;
    type: string;
    label: string;
    required: boolean;
}) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-100">
            {label}
        </label>
        <input
            type={type}
            id={id}
            name={name}
            required={required}
            className="mt-1 block w-full rounded-md border-gray-300 bg-white text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
    </div>
);

export default async function AboutPage() {
    const users = await getUsers()

    async function createUser(formData: FormData) {
        'use server'
        const name = formData.get('name') as string
        const age = parseInt(formData.get('age') as string, 10)
        const email = formData.get('email') as string
        try {
            const user = await db.insert(usersTable).values({ name, age, email })
            console.log('created', user)
            redirect('/about')
        } catch (error) {
            console.error(error)
            redirect('/')
        }
    }

    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-6">Users</h1>
            {users.map((user) => (
                <div key={user.id}>
                    {user.name} - {user.age} - {user.email}
                </div>
            ))}
            <h2 className="text-2xl font-bold mt-8 mb-4">Create a New User</h2>

            <form action={createUser} method="POST" className="space-y-4">
                <InputField
                    id="name"
                    name="name"
                    type="text"
                    label="Name"
                    required={true}
                />
                <InputField
                    id="age"
                    name="age"
                    type="number"
                    label="Age"
                    required={true}
                />
                <InputField
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    required={true}
                />
                <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                    Create User
                </button>
            </form>
        </div >
    );

}