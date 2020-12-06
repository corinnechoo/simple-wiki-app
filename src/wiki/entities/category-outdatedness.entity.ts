import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity("categoryoutdatedness")
export class CategoryOutdatedness {
    @PrimaryColumn()
    category: string;

    @PrimaryColumn('int')
    page_id: number;

    @Column()
    newest_page_link: string;

    @Column()
    page_last_modified: string;

    @Column()
    is_outdated: number;

    @Column('bigint')
    time_stamp_diff: number;
}
