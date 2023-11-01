import { Knex } from "knex";
import User from "../../models/user.model";
import Post from "../../models/post.model";
import bcrypt from 'bcrypt';


export async function seed(knex: Knex): Promise<void> {
    const user = await User.findOne({email: "admin@admin.com"});
    let userId = user?.id;
    if(!user) {
        const [dataId] = await User.insert({ id: 1, email: "admin@admin.com", full_name: 'Admin', password: bcrypt.hashSync('admin', bcrypt.genSaltSync(10)) })
        userId = dataId;
    }

    const posts = await Post.all();
    if(posts.length > 0) { return;}

    await Post.insert([
        { id: 1, user_id: userId, title: "Lorem ipsum dolor sit amet", content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ' },
        { id: 2, user_id: userId, title: "Lorem ipsum, or lipsum", content: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bonorum et Malorum for use in a type specimen book.' },
        { id: 3, user_id: userId, title: "Lorem ipsum began", content: 'Until recently, the prevailing view assumed lorem ipsum was born as a nonsense text. “Its not Latin, though it looks like it, and it actually says nothing,” Before & After magazine answered a curious reader, “Its ‘words’ loosely approximate the frequency with which letters occur in English, which is why at a glance it looks pretty real.' }
    ]);
};
