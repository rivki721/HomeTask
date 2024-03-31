import MembersModel from "./schemas/membersModel.js";
import { createNewMember, deleteMemberById, getMemberById, getUnvaccinatedMembersCount, updateMemberById } from "./model.js";


export const getUnvaccinatedCount = async (req, res, next) => {
  try {
    const unvaccinatedMembers = await getUnvaccinatedMembersCount();

    res.status(200).send(unvaccinatedMembers.toString());
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createMember = async (req, res, next) => {
  try {
    await createNewMember(req.body);

    res.status(200).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateMember = async (req, res, next) => {
  try {
    const member = await MembersModel.findOne({
      where: {
        id: req.body.id,
      },
    });

    if (!member) {
      throw new Error("Member not found");
    }

    await updateMemberById(req.body.id, req.body);

    res.status(200).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMembers = async (req, res, next) => {
  try {
    const members = await MembersModel.findAll();

    res.status(200).json(members);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMember = async (req, res, next) => {
  try {
    const member = await getMemberById(req.params.id)

    res.status(200).json(member);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteMember = async (req, res, next) => {
  try {
    await deleteMemberById(req.params.id);

    res.status(200).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
