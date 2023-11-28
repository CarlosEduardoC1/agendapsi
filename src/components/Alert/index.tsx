import { AlertDialog, Button } from "native-base";
import styles from "./styles.module.scss";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    cancelRef: any;
    title: string;
    body: string;
    confirmButton: string;
    onConfirm: () => void;
}

export const Alert: React.FC<Props> = ({
    isOpen,
    onClose,
    cancelRef,
    body,
    confirmButton,
    title,
    onConfirm }): React.ReactElement => {
    return (
        <AlertDialog
            className={styles["container"]}
            leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
            <AlertDialog.Content>
                <AlertDialog.Header>{title}</AlertDialog.Header>
                <AlertDialog.Body>
                    {body}
                </AlertDialog.Body>
                <AlertDialog.Footer>
                    <Button.Group space={2}>
                        <Button
                            variant="unstyled"
                            colorScheme="coolGray"
                            onPress={onClose}
                            ref={cancelRef}>
                            Cancel
                        </Button>
                        <Button colorScheme="danger" onPress={onConfirm}>
                            {confirmButton}
                        </Button>
                    </Button.Group>
                </AlertDialog.Footer>
            </AlertDialog.Content>
        </AlertDialog>
    )
};