import { User } from "@models/user.entity";
import { getManager } from "typeorm";

export async function getAllUsers(req, res) {

  const postRepository = getManager().getRepository(User);
  // load a post by a given post id
  const posts = await postRepository.find();

  // return loaded posts
  res.send(posts);
}