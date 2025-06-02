import styled from "styled-components"
import { useStore } from "../../store/StaffPageStore";
import { useState } from "react";
import Edit from "@img/Edit.svg?react"
import DeleteTrash from "@img/DeleteTrash.svg?react"
import CheckArrow from "@img/CheckArrow.svg?react"

const TechniquesPageCardStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
`

const TechniquesCardContainer = styled.div <{ $isEdit: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${props => props.$isEdit ? "25px 30px" : "12px 30px 13px 30px"};
    background: #1C1C1C;
    border-radius: 25px;
    height: fit-content;
`

const TechniquesCardNameContainer = styled.div <{ $isEdit: boolean }>`
    display: flex;
    align-items: center;
    width: 85%;
    gap: 35px;
`

const TechniquesImg = styled.img`
    height: 75px;
    width: 75px;
    min-width: 75px;
    border-radius: 1000px;
    object-fit: cover;
`

const TechniquesName = styled.span`
    color: white;
    font-size: 24px;
    font-weight: 500;
`

const TechniquesNameInput = styled.input`
    width: 100%;
    border: none;
    outline: none;
    background: #333333;
    color: white;
    font-family: Montserrat;
    font-size: 24px;
    font-weight: 500;
    padding: 10px 8px;
    border-radius: 9px;
`

const TechniquesButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const EditSuccessButton = styled.div`
    height: 50px;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #333333;
    border-radius: 1000px;
    cursor: pointer;
`

const DeleteButton = styled.div`
    height: 50px;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #D20000;
    border-radius: 1000px;
    cursor: pointer;
`

export function TechniquesPageCard() {

    const Techniques = useStore((state) => state.techniques)
    const updateTechnique = useStore((state) => state.updateTechnique)
    const removeTechnique = useStore((state) => state.removeTechnique)

    const [editStates, setEditStates] = useState<{ [key: number]: boolean }>({})

    const toggleEditState = (id: number) => {
        setEditStates((prevStates) => ({
            ...prevStates,
            [id]: !prevStates[id]
        }))
    }

    const updateTechniqueNameHandler = (id: number, techniqueName: string) => {
        const [lastName, firstName, middleName] = techniqueName.split(" ");
        const technique = Techniques.find(d => d.id === id);
        
        if (technique && (
            technique.firstName !== firstName || 
            technique.lastName !== lastName || 
            technique.middleName !== middleName
        )) {
            updateTechnique(({
                ...technique,
                firstName,
                lastName,
                middleName
            }));
        }
    }

    return (
        <TechniquesPageCardStyled>
            {Techniques.map((technique) => (
                <TechniquesCardContainer
                    key={technique.id}
                    $isEdit={!!editStates[technique.id]}
                >
                    <TechniquesCardNameContainer $isEdit={!!editStates[technique.id]}>
                        <TechniquesImg src={technique.imgUrl} />
                        {editStates[technique.id] ? (
                            <TechniquesNameInput onChange={(e) => updateTechniqueNameHandler(technique.id, e.target.value)} defaultValue={`${technique.firstName} ${technique.lastName} ${technique.middleName}`} />
                        ) : (
                            <TechniquesName>
                                {technique.firstName} {technique.lastName} {technique.middleName}
                            </TechniquesName>
                        )}
                    </TechniquesCardNameContainer>
                    <TechniquesButtonContainer>
                        <EditSuccessButton onClick={() => toggleEditState(technique.id)}>
                            {editStates[technique.id] ? (
                                <CheckArrow stroke="#BDFF67" height="28px" width="32px" />
                            ) : (
                                <Edit />
                            )}
                        </EditSuccessButton>
                        {editStates[technique.id] && (
                            <DeleteButton onClick={() => removeTechnique(technique.id)}>
                                <DeleteTrash />
                            </DeleteButton>
                        )}
                    </TechniquesButtonContainer>
                </TechniquesCardContainer>
            ))}
        </TechniquesPageCardStyled>
    );
}