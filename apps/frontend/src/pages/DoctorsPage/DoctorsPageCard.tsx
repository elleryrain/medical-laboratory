import styled from "styled-components"
import { useStaffStore } from '@/store/StaffPageStore';
import ArrowDown from "@svg/ArrowDown.svg?react"
import ArrowUp from "@svg/ArrowUp.svg?react"
import Edit from "@svg/Edit.svg?react"
import DeleteTrash from "@svg/DeleteTrash.svg?react"
import CheckArrow from "@svg/CheckArrow.svg?react"
import { useState } from "react"

const DoctorsPageCardStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
`

const CardContainer = styled.div <{ $isOpen: boolean }>`
    display: flex;
    flex-direction: ${props => props.$isOpen ? "row-reverse" : "row"};
    width: 100%;
    gap: ${props => props.$isOpen ? "30px" : "0px"};
    justify-content: ${props => props.$isOpen ? "" : "space-between"};
    align-items: ${props => props.$isOpen ? "flex-start" : "center"};
    background: #1C1C1C;
    padding: ${props => props.$isOpen ? "30px 30px 30px 30px" : "12px 30px 13px 30px"};
    border-radius: 25px;
    max-height: fit-content;
`

const CloseCardImgNameContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 35px;
`

const CardImg = styled.img <{ $isOpen: boolean }>`
    height: ${props => props.$isOpen ? "255px" : "75px"};
    width: ${props => props.$isOpen ? "255px" : "75px"};
    min-width: ${props => props.$isOpen ? "255px" : "75px"};
    object-fit: cover;
    border-radius: ${props => props.$isOpen ? "15px" : "1000px"};
`

const CardName = styled.span <{ $isOpen: boolean }>`
    color: white;
    font-size: 24px;
    font-weight: 500;
    width: ${props => props.$isOpen ? "90%" : "auto"};
`

const CardButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const OpenSuccessCardButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background: #333333;
    border: none;
    width: 60px;
    height: 50px;
    border-radius: 1000px;
    cursor: pointer;
`

const EditDeleteCardButton = styled.button <{ $isEdit: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.$isEdit ? "#D20000" : "#333333"};
    border: none;
    width: 60px;
    height: 50px;
    border-radius: 1000px;
    cursor: pointer;
`

const OpenCardImgInfoContainer = styled.div <{ $isEdit: boolean }>`
    display: flex;
    gap: ${props => props.$isEdit ? "30px" : "38px"};
    width: 100%;
`

const OpenCardInfoContainer = styled.div <{ $isEdit: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: ${props => props.$isEdit ? "5px 0" : "10px 0"};
    width: 100%;
`

const OpenCardClinicAdressContainer = styled.div <{ $isEdit: boolean }>`
    display: flex;
    flex-direction: column;
    gap: ${props => props.$isEdit ? "3px" : "8px"};
    width: 100%;
`

const OpenCardClinicAdressTitle = styled.span <{ $isEdit: boolean }>`
    color: white;
    font-size: 20px;
    font-weight: 500;
    padding-left: ${props => props.$isEdit ? "8px" : "0"};
`

const OpenCardClinicAdressName = styled.span`
    color: white;
    font-size: 24px;
    font-weight: 500;
`

const OpenCardClinicAdressNameInput = styled.input`
    background: #333333;
    outline: none;
    border: none;
    padding: 5px 8px;
    color: white;
    font-size: 24px;
    font-weight: 500;
    width: 100%;
    border-radius: 9px;
`

const CardNameInput = styled.textarea`
    background: #333333;
    outline: none;
    border: none;
    padding: 5px 8px;
    color: white;
    font-size: 24px;
    font-weight: 500;
    width: 100%;
    resize: none;
    border-radius: 9px;
`

export function DoctorsPageCard() {

    const Doctors = useStaffStore((state) => state.doctors)
    const updateDoctor = useStaffStore((state) => state.updateDoctor);
    const removeDoctor = useStaffStore((state) => state.removeDoctor);

    const [openCardStates, setOpenCardStates] = useState<{ [key: number]: boolean }>({});
    const [editCardStates, setEditCardStates] = useState<{ [key: number]: boolean }>({});
    
    const toggleState = (
        setState: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>,
        id: number
    ) => {
        setState((prevStates) => ({
            ...prevStates,
            [id]: !prevStates[id]
        }));
    };

    const toggleCard = (id: number) => toggleState(setOpenCardStates, id);
    const toggleEditCard = (id: number) => toggleState(setEditCardStates, id);

    const buttonHandler = (name: string, id: number) => {
        if (name === "toggleCard") {
            if (editCardStates[id]) {
                console.log("Выполняем success для карточки с id:", id);
                toggleEditCard(id);
            } else {
                toggleCard(id);
            }
        } else if (name === "editCard") {
            if (!editCardStates[id]) {
                toggleEditCard(id);
            } else {
                console.log("Выполняем delete для карточки с id:", id);
                removeDoctor(id);
            }
        } else {
            console.log("Ошибка buttonHandler: неизвестное имя", name);
        }
    };

    const updateDoctorNameHandler = (id: number, doctorName: string) => {
        const [lastName, firstName, middleName] = doctorName.split(" ");
        const doctor = Doctors.find(d => d.id === id);
        
        if (doctor && (
            doctor.firstName !== firstName || 
            doctor.lastName !== lastName || 
            doctor.middleName !== middleName
        )) {
            updateDoctor({
                ...doctor,
                firstName,
                lastName,
                middleName
            });
        }
    }
    
    const updateDoctorClinicHandler = (id: number, clinicName: string) => {
        const doctor = Doctors.find(d => d.id === id);
    
        if (doctor && doctor.nameClinic !== clinicName) {
            updateDoctor({
                ...doctor,
                nameClinic: clinicName
            });
        }
    }
    
    const updateDoctorAdressHandler = (id: number, addressName: string) => {
        const doctor = Doctors.find(d => d.id === id);
    
        if (doctor && doctor.address !== addressName) {
            updateDoctor({
                ...doctor,
                address: addressName
            });
        }
    }

    return (
        <DoctorsPageCardStyled>
            {Doctors.map((doctor) => (
                <CardContainer $isOpen={openCardStates[doctor.id]} key={doctor.id}>
                    {!openCardStates[doctor.id] && (
                        <CloseCardImgNameContainer>
                            <CardImg $isOpen={openCardStates[doctor.id]} src={doctor.imgUrl} alt="" />
                            <CardName $isOpen={openCardStates[doctor.id]}>{`${doctor.firstName} ${doctor.lastName} ${doctor.middleName}`}</CardName>
                        </CloseCardImgNameContainer>
                    )}

                    <CardButtonContainer>
                        <OpenSuccessCardButton onClick={() => buttonHandler("toggleCard", doctor.id)}>
                            {editCardStates[doctor.id] ? (
                                <CheckArrow stroke="#BDFF67" width="32px" height="28px" />
                            ) : openCardStates[doctor.id] ? (
                                <ArrowUp />
                            ) : (
                                <ArrowDown />
                            )}
                        </OpenSuccessCardButton>
                        {openCardStates[doctor.id] && (
                            <EditDeleteCardButton
                                $isEdit={editCardStates[doctor.id]}
                                onClick={() => buttonHandler("editCard", doctor.id)}
                            >
                                {editCardStates[doctor.id] ? <DeleteTrash /> : <Edit />}
                            </EditDeleteCardButton>
                        )}
                    </CardButtonContainer>

                    {openCardStates[doctor.id] && (
                        <OpenCardImgInfoContainer $isEdit={editCardStates[doctor.id]}>
                            <CardImg $isOpen={openCardStates[doctor.id]} src={doctor.imgUrl} alt="" />
                            <OpenCardInfoContainer $isEdit={editCardStates[doctor.id]}>
                                {editCardStates[doctor.id] ? (
                                    <CardNameInput onChange={(e) => updateDoctorNameHandler(doctor.id, e.target.value)} defaultValue={`${doctor.firstName} ${doctor.lastName} ${doctor.middleName}`} />
                                ) : (
                                    <CardName $isOpen={openCardStates[doctor.id]}>{`${doctor.firstName} ${doctor.lastName} ${doctor.middleName}`}</CardName>
                                )}
                                <OpenCardClinicAdressContainer $isEdit={editCardStates[doctor.id]} >
                                    <OpenCardClinicAdressTitle $isEdit={editCardStates[doctor.id]}>Клиника</OpenCardClinicAdressTitle>
                                    {editCardStates[doctor.id] ? (
                                        <OpenCardClinicAdressNameInput onChange={(e) => updateDoctorClinicHandler(doctor.id, e.target.value)} type="text" defaultValue={doctor.nameClinic} />
                                    ) : (
                                        <OpenCardClinicAdressName>{doctor.nameClinic}</OpenCardClinicAdressName>
                                    )}
                                </OpenCardClinicAdressContainer>
                                <OpenCardClinicAdressContainer $isEdit={editCardStates[doctor.id]} >
                                    <OpenCardClinicAdressTitle $isEdit={editCardStates[doctor.id]}>Адресс</OpenCardClinicAdressTitle>
                                    {editCardStates[doctor.id] ? (
                                        <OpenCardClinicAdressNameInput onChange={(e) => updateDoctorAdressHandler(doctor.id, e.target.value)} type="text" defaultValue={doctor.address} />
                                    ) : (
                                        <OpenCardClinicAdressName>{doctor.address}</OpenCardClinicAdressName>
                                    )}
                                </OpenCardClinicAdressContainer>
                            </OpenCardInfoContainer>
                        </OpenCardImgInfoContainer>
                    )}
                </CardContainer>
            ))}
        </DoctorsPageCardStyled>
    )
}