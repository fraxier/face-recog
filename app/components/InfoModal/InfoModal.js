import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, Link } from "@nextui-org/react";


export default function InfoModal() {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const ListItem = ({children}) => { return <li className="mb-4 ">{children}</li>}

    return (
        <>
            <Button className="w-min mx-auto" color="primary" onPress={onOpen}>Learn about AI Model used</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">About Age AI</ModalHeader>
                    <ModalBody>
                        <p className="font-semibold">Overview</p>
                        <p> 
                            Smart Brain uses Clarifai’s face age detection model which is designed to accurately predict the age of an individual based on their facial features. This model utilizes cutting-edge machine learning techniques, the model is trained on a diverse dataset of facial images, allowing it to accurately detect age ranges from infancy to the elderly. 
                        </p>
                        <p className="font-semibold">Limitations</p>
                        <ul className="list-inside list-disc">
                            <ListItem>
                                Limited to individual faces
                            </ListItem>
                            <ListItem>
                                Limited accuracy for certain age ranges
                            </ListItem>
                            <ListItem>
                                Limited accuracy for certain races and genders
                            </ListItem>
                            <ListItem>
                                Limited accuracy for certain facial expressions
                            </ListItem>
                        </ul>
                        <Link href="https://clarifai.com/clarifai/demographics-age-new/models/age-demographics">Clarifai.com/demographics-age</Link>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                        Close
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        </>
    )
}