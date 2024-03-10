import { OrganizationSwitcher as Switcher } from "@clerk/nextjs"

export function OrganizationSwitcher() {
    return (
        <Switcher
            hidePersonal
            afterCreateOrganizationUrl="/organization/:id"
            afterLeaveOrganizationUrl="/select-org"
            afterSelectOrganizationUrl="/organization/:id"
            appearance={{
                elements: {
                    rootBox: {
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    },
                },
            }}
        />
    )
}
