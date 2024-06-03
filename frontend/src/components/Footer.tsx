export default function Footer() {
  return (
    <footer className="w-full flex flex-col py-3 gap-2 items-center justify-center h-full max-h-[100px] bg-base127b">
      <span className="text-xs text-base127d">CMSC 127 Project by TININIW</span>

      <span className="text-[0.5rem] text-base127d">
        <a
          href="https://iconscout.com/icons/tongue"
          class="text-underline font-size-sm"
          target="_blank"
        >
          Tongue
        </a>{" "}
        by{" "}
        <a
          href="https://iconscout.com/contributors/twitter-inc"
          class="text-underline font-size-sm"
          target="_blank"
        >
          Twitter Emoji
        </a>
      </span>
    </footer>
  );
}
