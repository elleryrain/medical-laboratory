import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Edit from '@svg/Edit.svg?react';
import DeleteTrash from '@svg/DeleteTrash.svg?react';
import CheckArrow from '@svg/CheckArrow.svg?react';
import { useGetTechnicians } from '@/hooks/useGetTechnicians';

export function TechniquesPageCard() {
  const { technicians, isLoading, isAuthenticated } = useGetTechnicians();
  const queryClient = useQueryClient();
  const [editStates, setEditStates] = useState<{ [key: number]: boolean }>({});

  const toggleEditState = (id: number) => {
    setEditStates((prevStates) => ({
      ...prevStates,
      [id]: !prevStates[id],
    }));
  };

  const updateTechniqueNameHandler = async (
    id: number,
    techniqueName: string,
  ) => {
    const [name, surname, middleName] = techniqueName
      .split(' ')
      .filter(Boolean);
    const technician = technicians?.find((d) => d.id === id);

    if (
      technician &&
      (technician.name !== name ||
        technician.surname !== surname ||
        technician.middleName !== middleName)
    ) {
      try {
        // await updateTechnician(id, {
        //   name: name || technician.name,
        //   surname: surname || technician.surname,
        //   middleName: middleName || technician.middleName,
        // });
        // Invalidate the technicians query to refetch the updated data
        // await queryClient.invalidateQueries({ queryKey: ['technicians'] });
        // toggleEditState(id); // Exit edit mode after successful update
      } catch (error) {
        console.error('Failed to update technician:', error);
      }
    }
  };

  const removeTechniqueHandler = async (id: number) => {
    try {
      // await removeTechnician(id);
      // // Invalidate the technicians query to refetch the updated list
      // await queryClient.invalidateQueries({ queryKey: ['technicians'] });
    } catch (error) {
      console.error('Failed to remove technician:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (!technicians || technicians.length === 0) {
    return <div>No technicians found.</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-[30px]">
      {technicians.map((technician) => (
        <div
          key={technician.id}
          className={`flex justify-between items-center bg-[#1c1c1c] rounded-[25px] h-fit ${
            editStates[technician.id]
              ? 'p-[25px_30px]'
              : 'p-[12px_30px_13px_30px]'
          }`}
        >
          <div
            className={`flex items-center w-[85%] gap-[35px] ${editStates[technician.id] ? 'h-fit' : ''}`}
          >
            <img
              src={technician.avatar || '/default-avatar.png'}
              className="h-[75px] w-[75px] min-w-[75px] rounded-full object-cover"
            />
            {editStates[technician.id] ? (
              <input
                onChange={(e) =>
                  updateTechniqueNameHandler(technician.id, e.target.value)
                }
                defaultValue={`${technician.name} ${technician.surname} ${technician.middleName || ''}`}
                className="w-full border-none outline-none bg-[#333333] text-white font-montserrat text-2xl font-medium p-[10px_8px] rounded-[9px]"
              />
            ) : (
              <span className="text-white text-2xl font-medium">
                {technician.name} {technician.surname}{' '}
                {technician.middleName || ''}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-5">
            <div
              onClick={() => toggleEditState(technician.id)}
              className="h-[50px] w-[60px] flex items-center justify-center bg-[#333333] rounded-full cursor-pointer"
            >
              {editStates[technician.id] ? (
                <CheckArrow stroke="#BDFF67" className="h-7 w-8" />
              ) : (
                <Edit />
              )}
            </div>
            {editStates[technician.id] && (
              <div
                onClick={() => removeTechniqueHandler(technician.id)}
                className="h-[50px] w-[60px] flex items-center justify-center bg-[#d20000] rounded-full cursor-pointer"
              >
                <DeleteTrash />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
