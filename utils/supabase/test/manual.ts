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

const createUser = async () => {
    const { data, error } = await supabase.schema('public')

    if (error) {
        console.log(error)
    }
    if (data) {
        console.log(data)
    }
}

const testArrays = async () => {
    const { data: insertData, error: insertError } = await supabase
        .from('arraytest')
        .insert({ array: ['haarry', 'sally'] });

    if (insertError) {
        console.error('Error inserting array:', insertError);
    } else {
        console.log('Array inserted successfully:', insertData);
    }

    const { data, error } = await supabase.from('arraytest').select('*')
    console.log("here you go", data)
}

async function main() {
    await testArrays()
}
main()