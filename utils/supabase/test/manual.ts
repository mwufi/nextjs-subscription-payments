import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
console.log(supabaseUrl)
console.log(supabaseKey)

// const supabase = createClient(supabaseUrl, supabaseKey)
// console.log(supabase)

const supabase = createClient(supabaseUrl, supabaseKey);

// const result = supabase
//     .from('todos')
//     .insert([
//         { id: 1, task: 'todos' },
//         { id: 2, task: 'Vietnam' },
//     ])
// console.log(result)

// executor 
const fetchTodos = async () => {
    const { data, error } = await supabase
        .from('todos')
        .select()

    if (data) {
        console.log(data)
    }
    if (error) {
        console.log("error feteching", error)
    }
}

const insertTodo = async () => {
    const { data, error } = await supabase
        .from('todos')
        .insert([
            { id: 1, task: 'todos' },
            { id: 2, task: 'Vietnam' },
        ])
    if (data) {
        console.log(data)
    }
    if (error) {
        console.log(error)
    }
}

async function main() {
    fetchTodos()
}
main()