import { usePathname } from "next/navigation";

export const useUrlPath = () => {
  let pathname = usePathname();
  let pathFragments: { href: string; name: string }[] = pathname
    .split("/")
    .map((item, index, array) => {
      let tmp = 0;
      let href = "";
      if (item === "") {
        tmp++;
        return { href: "/", name: "home" };
      }
      while (tmp <= index) {
        href += array[tmp] + (tmp === index ? "" : "/");
        tmp++;
      }
      return { href, name: item };
    });

  return { pathname, pathFragments };
};
