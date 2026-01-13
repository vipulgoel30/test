// User imports
import TaskStatus from "../../enums/TaskStatus.ts";
import UserDepartment from "../../enums/UserDepartment.ts";

export default {
    USER: {
        NAME: {
            NAME: "Name",
            TYPE: "string",
            MIN_LENGTH: 1,
            MAX_LENGTH: 100,
        },

        USERNAME: {
            NAME: "Username",
            TYPE: "string",
            MIN_LENGTH: 1,
            MAX_LENGTH: 100,
            REGEX: /^[A-Za-z][A-Za-z0-9_@]*$/,
        },

        PASSWORD: {
            NAME: "Password",
            TYPE: "string",
            MIN_LENGTH: 8,
            MAX_LENGTH: 50,
        },

        EMAIL: {
            NAME: "Email",
            TYPE: "email",
        },

        USER: {
            NAME: "User",
            TYPE: "string",
        },

        DEPARTMENT: {
            NAME: "Department",
            TYPE: "enum",
            ENUM: UserDepartment,
        },
    },

    BOARD: {
        TITLE: {
            NAME: "Title",
            TYPE: "string",
            MIN_LENGTH: 1,
            MAX_LENGTH: 50,
        },
        DESCRIPTION: {
            NAME: "Description",
            TYPE: "string",
            MIN_LENGTH: 10,
            MAX_LENGTH: 500,
        },
    },

    TASK: {
        TITLE: {
            NAME: "Title",
            TYPE: "string",
            MIN_LENGTH: 1,
            MAX_LENGTH: 100,
        },
        DESCRIPTION: {
            NAME: "Description",
            TYPE: "string",
            MIN_LENGTH: 1,
            MAX_LENGTH: 1000,
        },
        STATUS: {
            NAME: "Status",
            TYPE: "enum",
            ENUM: TaskStatus,
        },
        START_DATE: {
            NAME: "Task start date",
            TYPE: "date",
        },
        END_DATE: {
            NAME: "Task end date",
            TYPE: "date",
        },
    },
} as const;
