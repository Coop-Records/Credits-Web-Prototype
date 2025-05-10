import CreditsDrawer from "@/components/credits-drawer";
import LogoutButton from "@/components/login-button";
import { SongPurchaseButton } from "@/components/song-purchase-button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold mb-4">Music App</h1>
          <LogoutButton />
        </div>
        <p className="text-gray-600 mb-6">
          Purchase credits to listen to your favorite songs.
        </p>
        <SongPurchaseButton />
        <CreditsDrawer />
      </div>
    </main>
  );
}
