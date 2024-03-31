import { Sequelize } from "sequelize";
import CovidMembersModel from "./schemas/covidMembersModel.js";
import MembersModel from "./schemas/membersModel.js";
import VaccinationsModel from "./schemas/vaccinationsModel.js";

export const deleteMemberById = async (memberId) => {
  await VaccinationsModel.destroy({
    where: {
      memberId: memberId,
    },
  });

  await CovidMembersModel.destroy({
    where: {
      memberId: memberId,
    },
  });

  await MembersModel.destroy({
    where: {
      id: memberId,
    },
  });
};

export const getMemberById = async (id) => {
  const member = await MembersModel.findOne({
    where: { id: id },
    include: [
      {
        model: VaccinationsModel,
      },
      {
        model: CovidMembersModel,
      },
    ],
  });

  return member;
};

export const createNewMember = async (memberData) => {
  const member = await MembersModel.create(memberData);

  if (memberData.vaccinations && memberData.vaccinations.length) {
    const vaccinations = memberData.vaccinations.map((vaccination) => ({ ...vaccination, memberId: member.id }));
    await VaccinationsModel.bulkCreate(vaccinations);
  }

  if (memberData.covidMember) {
    await CovidMembersModel.create({ ...memberData.covidMember, memberId: member.id });
  }
};

export const updateMemberById = async (memberId, memberData) => {
  await MembersModel.update(memberData, {
    where: {
      id: memberId,
    },
  });

  if (memberData.vaccinations && memberData.vaccinations.length) {
    await VaccinationsModel.destroy({ where: { memberId: memberId } });
    await VaccinationsModel.bulkCreate(
      memberData.vaccinations.map((vaccination) => ({ ...vaccination, memberId: memberId }))
    );
  }

  if (memberData.covidMember) {
    await CovidMembersModel.destroy({ where: { memberId: memberId } });
    await CovidMembersModel.create({ ...memberData.covidMember, memberId: memberId });
  }
};

export const getUnvaccinatedMembersCount = async () => {
  const unvaccinatedMembers = await MembersModel.count({
    where: Sequelize.literal(
      `(SELECT COUNT(*) FROM "Vaccinations" WHERE "Vaccinations"."memberId" = "Members"."id") = 0`
    ),
  });

  return unvaccinatedMembers;
};
