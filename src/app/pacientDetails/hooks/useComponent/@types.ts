export interface Props {
    id?: string;
}

export type SupportedModes = "tel" | "mailto" | "whatsapp";

export type UseComponent = {
  openLinking: (mode: SupportedModes, url: string) => void;
  newSession: () => void;
};
