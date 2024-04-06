import { UserButton } from "@clerk/nextjs";

export function UserSettings() {
  return (
    <UserButton
      afterSignOutUrl="/"
      appearance={{
        elements: {
          avatarBox: {
            height: 30,
            width: 30
          }
        }
      }}
    />
  );
}
