export interface MockUser {
    id: string;
    email: string;
    password: string;
    role: "employee" | "admin" | "super_admin";
    name: string;
    status: "Active" | "Inactive" | "Deleted" ;
}

export const mockUsers: MockUser[] = [
    {
        id: "1",
        email: "employee@test.com",
        password: "employee123",
        role: "employee",
        name: "Employee User",
        status: "Active",
    },
    {
        id: "2",
        email: "admin@test.com",
        password: "admin123",
        role: "admin",
        name: "Admin User",
        status: "Active"
    },
    {
        id: "3",
        email: "super@test.com",
        password: "superadmin123",
        role: "super_admin",
        name: "Super Admin",
        status: "Active"
    },
];
