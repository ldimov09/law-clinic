export interface ICase {
    id: number;
    guest_id: number;
    title: string;
    description: string;
    specialty: number | string;
    status: string;
}